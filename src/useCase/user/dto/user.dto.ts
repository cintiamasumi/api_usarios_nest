import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'ID do usuario', required: false })
  id?: string;

  @ApiProperty({ description: 'Nome do usuario' })
  userName: string;

  @ApiProperty({ description: 'Senha do usuário' })
  password?: string;

  @ApiPropertyOptional({ description: 'ID do usuario pai' })
  parentUserId?: string | null;
}
