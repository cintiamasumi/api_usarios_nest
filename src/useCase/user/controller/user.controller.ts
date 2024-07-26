import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard'
import { UserService } from '../service/user.service'
import { UserParentDto } from '../dto/user.parent.dto'
import { UserUpdateDto } from '../dto/user.update.dto'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

@ApiTags('Usuários')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('tree')
  @ApiOperation({
    summary: 'Retorna a árvore de usuários de acordo com o parentUserId ',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista encontrada',
    type: UserParentDto,
  })
  @ApiResponse({ status: 401, description: 'Rota não autorizada' })
  async getUserHierarchy(): Promise<UserParentDto[]> {
    return this.userService.getUsersTree()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Buscar um usuario por ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    type: UserParentDto,
  })
  @ApiResponse({ status: 401, description: 'Rota não autorizada' })
  async getUser(@Param('id') id: string) {
    return this.userService.findOneById(id)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um usuario por ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuario atualizado',
    type: UserParentDto,
  })
  @ApiResponse({ status: 404, description: 'Requisição inválida' })
  @ApiResponse({ status: 401, description: 'Rota não autorizada' })
  async updateUser(@Param('id') id: string, @Body() updateUser: UserUpdateDto) {
    return this.userService.update(id, updateUser)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deleta o usuário pelo ID' })
  @ApiResponse({ status: 200, description: 'Usuario deletado' })
  @ApiResponse({ status: 401, description: 'Rota não autorizada' })
  async deletUser(@Param('id') id: string) {
    return this.userService.remove(id)
  }
}
