import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserUpdateDto {
  @ApiProperty({ description: 'Nome do usuario' })
  userName: string;

  @ApiPropertyOptional({ description: 'Senha do Usuario' })
  password?: string;

  @ApiPropertyOptional({ description: 'Id do usuario pai' })
  parentUserId?: string | null;
}
