import { Controller } from '@nestjs/common'
import { UsersService } from './users.service'
import { MessagePattern } from '@nestjs/microservices'
import { LoginDto } from '@app/common/dto/users/login.dto'
import { CreateUserDto } from '@app/common/dto/users/create-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'register' })
  async register(createUserDto: CreateUserDto) {
    return await this.usersService.register(createUserDto)
  }

  @MessagePattern({ cmd: 'login' })
  async login(loginDto: LoginDto) {
    return await this.usersService.login(loginDto)
  }

  @MessagePattern({ cmd: 'logout' })
  async logout(userId: string) {
    return await this.usersService.logout(userId)
  }

  // @Post('refresh-token')
  // @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthenticationGuard)
  // async refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
  //   // const userId = req.user['userId'] as string
  //   // const { accessToken, refreshToken } = await this.usersService.refreshToken(userId)
  //   // res.cookie('access_token', accessToken)
  //   // res.cookie('refresh_token', refreshToken)
  // }
}
