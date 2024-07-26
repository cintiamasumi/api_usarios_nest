import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user/user.entity'
import { Repository } from 'typeorm/repository/Repository'
import * as bcrypt from 'bcryptjs'
import { UserParentDto } from '../dto/user.parent.dto'
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUsersTree(): Promise<UserParentDto[]> {
    const users = await this.userRepository.find({
      where: { isDeleted: false },
    });
    if (!users) {
      throw new Error('Users not found.')
    }
    const result = this.buildUserTree(users);

    return result;
  }

  private buildUserTree(users: User[]): UserParentDto[] {
    const buildHierarchy = (users: User[]): UserParentDto[] => {
      const userMap: { [key: number]: UserParentDto } = {}
      // Cria um mapa de todos os usuários
      users.forEach((user) => {
        userMap[user.id] = {
          id: user.id,
          userName: user.userName,
          parentUserId: user.parentUserId,
          parents: [],
        };
      });

      const rootUsers: UserParentDto[] = []

      users.forEach((user) => {
        if (user.parentUserId === null) {
          // Se o usuário não tem parentUserId, é um usuário raiz
          rootUsers.push(userMap[user.id]);
        } else {
          // Adiciona o usuário à lista de parents do seu pai
          userMap[user.parentUserId].parents!.push(userMap[user.id]);
        }
      });
      return rootUsers;
    };

    const usersHierarchy = buildHierarchy(users)
    return usersHierarchy;
  }

  async findOneById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id })
  }

  async update(id: string, user: Partial<User>): Promise<void> {
    if (user.password && user.password.length > 0) {
      const setPassword = await this.updatePassword(user.password);
      user.password = setPassword;
    }
    await this.userRepository.update(id, user)
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOneById(id)
    if (!user) {
      throw new Error('User not found.')
    }
    user.isDeleted = true;
    await this.userRepository.save(user)
  }

  async updatePassword(pass: string) {
    try {
      const hashedPassword = await bcrypt.hash(pass, 10);
      return hashedPassword
    } catch (error) {
      throw new HttpException(
        'Error for bcrypt',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
