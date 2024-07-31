import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ResponseData } from '@app/common/core/response.core'
import { LoginDto } from './dto/login.dto'
import { USER_MESSAGE_SUCCESS } from './constants/message.constant'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const data = await this.usersService.register(createUserDto)

    return new ResponseData({ message: USER_MESSAGE_SUCCESS.REGISTER_SUCCESS, data })
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const data = await this.usersService.login(loginDto)

    return new ResponseData({ message: USER_MESSAGE_SUCCESS.LOGIN_SUCCESS, data })
  }
}
