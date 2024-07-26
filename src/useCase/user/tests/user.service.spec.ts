import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/database/entities/user/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../service/user.service';
import {
  mockOneUser,
  mockUser,
  mockUserRepository,
  mockUserTree,
} from 'src/__mock__/userMock';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUsersTree', () => {
    it('should return a user tree', async () => {
      const result = await service.getUsersTree();
      expect(result).toEqual(mockUserTree);
      expect(repository.find).toHaveBeenCalledWith({
        where: { isDeleted: false },
      });
    });
  });

  describe('findOneById', () => {
    it('should return a user by ID', async () => {
      const result = await service.findOneById(
        'b72add7e-5a4b-42fb-b988-4fb0a2555439',
      );

      expect(result).toEqual(mockOneUser);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: mockUser[0].id });
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const mockOneUser = { id: 'b72add7e-5a4b-42fb-b988-4fb0a2555439' };
      const userUpdate = {
        userName: 'updatedName',
        passWord: 'hashedPassword',
      };
      const hashedPassword = 'hashedPassword';

      jest.spyOn(service, 'updatePassword').mockResolvedValue(hashedPassword);
      await service.update(mockOneUser.id, userUpdate);

      expect(repository.update).toHaveBeenCalledWith(mockOneUser.id, {
        userName: userUpdate.userName,
        passWord: hashedPassword,
      });
    });
  });

  describe('remove', () => {
    it('should mark a user as deleted', async () => {
      await service.remove(mockOneUser.id);
      expect(repository.save).toHaveBeenCalledWith({
        ...mockOneUser,
        isDeleted: true,
      });
    });
  });
});
