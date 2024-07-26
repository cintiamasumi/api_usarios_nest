import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common'
import { AuthService } from './auth.service'

import { Response } from 'express'
import { JwtAuthGuard } from './jwt.auth.guard'
import { UserLoginDto } from 'src/useCase/user/dto/user.login.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserRegisterDto } from 'src/useCase/user/dto/user.register.dto'

@ApiTags('Login')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Registra um usuário' })
  @Post('register')
  async register(@Body() createUserDto: UserRegisterDto, @Res() res: Response) {
    const user = await this.authService.register(createUserDto);
    return res.status(HttpStatus.CREATED).json(user)
  }
  @ApiOperation({ summary: 'Realiza Login e retorna um token Jwt' })
  @Post('login')
  async login(@Body() loginUserDto: UserLoginDto, @Res() res: Response) {
    const { access_token } = await this.authService.login(loginUserDto)
    res.cookie('jwt', access_token, { httpOnly: true })
    return res.status(HttpStatus.OK).json({ access_token })
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Realiza logout' })
  @Post('logout')
  async logout(@Request() req, @Res() res: Response) {
    req.logout((err) => {
      if (err) {
        return res.status(500).send({ message: 'Error logging out' })
      }
      res.clearCookie('jwt');
      return res.status(200).send({ message: 'Logout successful' })
    })
  }
}
