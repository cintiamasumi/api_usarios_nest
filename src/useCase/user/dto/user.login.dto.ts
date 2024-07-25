import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "./user.dto";

export class UserLoginDto {
    @ApiProperty({description:'Nome do usuario'})
    userName: string

    @ApiProperty({description: 'Senha do usuário'})
    password?: string
}