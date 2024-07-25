import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class UserRegisterDto {

    @ApiProperty({description:'Nome do usuario'})
    userName: string

    @ApiProperty({description: 'Senha do usuário'})
    password: string

    @ApiPropertyOptional({description: 'ID do usuario pai'})
    parentUserId?: string | null 
    
}