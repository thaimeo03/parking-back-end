import { Body, Controller, Inject, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { firstValueFrom } from 'rxjs'
import { LoginDto } from '@app/common/dto/users/login.dto'
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'
import { TokenDto } from '@app/common/dto/users/token.dto'
import { ResponseData } from '@app/common/core/response.core'
import { USER_MESSAGE_SUCCESS } from 'apps/user-management-service/src/users/constants/message.constant'

@Controller('users')
export class UsersController {
  private readonly client: ClientProxy

  // constructor(@Inject('USER_MANAGEMENT_SERVICE') private client: ClientProxy) {}

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001
      }
    })
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const pattern = { cmd: 'login' }
    const data = await firstValueFrom(this.client.send<TokenDto>(pattern, loginDto))

    res.cookie('access_token', data.accessToken)
    res.cookie('refresh_token', data.refreshToken)

    return new ResponseData({ message: USER_MESSAGE_SUCCESS.LOGIN_SUCCESS, data })
  }
}
