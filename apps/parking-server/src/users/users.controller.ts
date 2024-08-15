import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'
import { firstValueFrom } from 'rxjs'
import { LoginDto } from '@app/common/dto/users/login.dto'
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'
import { TokenDto } from '@app/common/dto/users/token.dto'
import { USER_MESSAGE_SUCCESS } from '@app/common/constants/users/message.constant'
import { AuthenticationGuard } from '@app/common/auth/guards/authentication.guard'
import { Roles } from '@app/common/decorators/roles.decorator'
import { ROLE } from '@app/common/enums/role.enum'
import { CreateUserDto } from '@app/common/dto/users/create-user.dto'
import { ResponseData } from '@app/common/core/success-response.core'

@Controller('users')
export class UsersController {
  private readonly client: ClientProxy

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001
      }
    })
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    const pattern = { cmd: 'register' }

    try {
      const data = await firstValueFrom(this.client.send<TokenDto>(pattern, createUserDto))
      res.cookie('access_token', data.accessToken)
      res.cookie('refresh_token', data.refreshToken)
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }

    return new ResponseData({ message: USER_MESSAGE_SUCCESS.REGISTER_SUCCESS })
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const pattern = { cmd: 'login' }

    try {
      const data = await firstValueFrom(this.client.send<TokenDto>(pattern, loginDto))
      res.cookie('access_token', data.accessToken)
      res.cookie('refresh_token', data.refreshToken)
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }

    return new ResponseData({ message: USER_MESSAGE_SUCCESS.LOGIN_SUCCESS })
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthenticationGuard)
  @Roles(ROLE.RENTER)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const pattern = { cmd: 'logout' }
    const userId = req.user['userId'] as string

    try {
      await firstValueFrom(this.client.send<void>(pattern, userId))
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }

    return new ResponseData({ message: USER_MESSAGE_SUCCESS.LOGOUT_SUCCESS })
  }
}
