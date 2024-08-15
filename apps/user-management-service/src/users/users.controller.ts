import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from '../../../../libs/common/src/dto/users/create-user.dto'
import { ResponseData } from '@app/common/core/response.core'
import { USER_MESSAGE_SUCCESS } from './constants/message.constant'
import { Request, Response } from 'express'
import { AuthenticationGuard } from '@app/common/auth/guards/authentication.guard'
import { ROLE } from '@app/common/enums/role.enum'
import { Roles } from '@app/common/decorators/roles.decorator'
import { MessagePattern } from '@nestjs/microservices'
import { LoginDto } from '@app/common/dto/users/login.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.usersService.register(createUserDto)

    // res.cookie('accessToken', accessToken)
    // res.cookie('refreshToken', refreshToken)

    // return new ResponseData({ message: USER_MESSAGE_SUCCESS.REGISTER_SUCCESS })

    return { accessToken, refreshToken }
  }

  @MessagePattern({ cmd: 'login' })
  async login(loginDto: LoginDto) {
    const { accessToken, refreshToken } = await this.usersService.login(loginDto)

    // res.cookie('access_token', accessToken)
    // res.cookie('refresh_token', refreshToken)

    // return new ResponseData({ message: USER_MESSAGE_SUCCESS.LOGIN_SUCCESS })

    return { accessToken, refreshToken }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthenticationGuard)
  @Roles(ROLE.RENTER)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const userId = req.user['userId'] as string
    await this.usersService.logout(userId)
    // res.clearCookie('access_token')
    // res.clearCookie('refresh_token')

    return new ResponseData({ message: 'Logout success' })
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthenticationGuard)
  async refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const userId = req.user['userId'] as string

    // const { accessToken, refreshToken } = await this.usersService.refreshToken(userId)

    // res.cookie('access_token', accessToken)
    // res.cookie('refresh_token', refreshToken)
  }
}
