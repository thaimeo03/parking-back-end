import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ResponseData } from '@app/common/core/response.core'
import { LoginDto } from './dto/login.dto'
import { USER_MESSAGE_SUCCESS } from './constants/message.constant'
import { Request, Response } from 'express'
import { AuthenticationGuard } from 'apps/user-management-service/src/auth/guards/authentication.guard'
import { Roles } from '../auth/decorators/roles.decorator'
import { ROLE } from '@app/common/enums/role.enum'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.usersService.register(createUserDto)

    res.cookie('accessToken', accessToken)
    res.cookie('refreshToken', refreshToken)

    return new ResponseData({ message: USER_MESSAGE_SUCCESS.REGISTER_SUCCESS })
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.usersService.login(loginDto)

    res.cookie('access_token', accessToken)
    res.cookie('refresh_token', refreshToken)

    return new ResponseData({ message: USER_MESSAGE_SUCCESS.LOGIN_SUCCESS })
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthenticationGuard)
  @Roles(ROLE.PARKING_OWNER)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await res.clearCookie('access_token')
    res.clearCookie('refresh_token')

    return new ResponseData({ message: 'Logout success' })
  }
}
