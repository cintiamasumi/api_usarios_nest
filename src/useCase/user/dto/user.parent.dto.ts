import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserDto } from "./user.dto";
import { User } from "src/database/entities/user/user.entity";

export class UserParentDto extends UserDto {
    @ApiPropertyOptional({type: [User] , description: 'Lista de usuarios'})
    parents?: UserDto[]
}