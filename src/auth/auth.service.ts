import {  Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/database/entities/user/user.entity";

import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/useCase/user/dto/user.dto";
import { UserLoginDto } from "src/useCase/user/dto/user.login.dto";
import { UserRegisterDto } from "src/useCase/user/dto/user.register.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async register(user: UserRegisterDto ): Promise<User> {
        const hashedPassword = await  bcrypt.hash(user.password, 10)
        const result =  await this.userRepository.findOne({where:{id: user.parentUserId},})
        const parentUser = result ? user.parentUserId : '';
        const createUser = await this.userRepository.create({
            userName: user.userName ,
            password: hashedPassword ,
            parentUserId: parentUser
        })
        return this.userRepository.save(createUser)
    }

    async validateUser(userName: string, pass: string): Promise<UserLoginDto | null > {
        const user = await this.userRepository.findOneBy({ userName })
        const verifyPass = await bcrypt.compare(pass, user.password)
        if(user && (verifyPass) ) {
            const { password , ...rest} = user
            return rest
        }
        return null
    }

    async login(user: UserDto ) {
        const payload =  { userName: user.userName, sub: user.id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}