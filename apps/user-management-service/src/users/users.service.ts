import { User } from '@app/database/entities/user.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AuthService } from '@app/common/auth/auth.service'
import { CreateUserDto } from '@app/common/dto/users/create-user.dto'
import { USER_MESSAGE_ERRORS } from '@app/common/constants/users/message.constant'
import { LoginDto } from '@app/common/dto/users/login.dto'
import { BadRequestRpcException } from '@app/common/core/error-response.core'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private authService: AuthService
  ) {}

  // 1. Check email exists
  // 2. Hash password
  // 3. Create user
  // 4. Generate token (access token, refresh token) taken from auth service
  // 5. Save user and return token
  async register(createUserDto: CreateUserDto) {
    // 1
    const isExist = await this.userRepository.findOneBy({
      email: createUserDto.email
    })
    if (isExist) throw new BadRequestRpcException(USER_MESSAGE_ERRORS.EMAIL_ALREADY_EXISTS)

    // 2
    const passwordHash = await bcrypt.hash(createUserDto.password, 10)

    // 3
    const newUser = this.userRepository.create({
      id: crypto.randomUUID(),
      email: createUserDto.email,
      password: passwordHash,
      name: createUserDto.name
    })

    // 4
    const { accessToken, refreshToken } = await this.authService.generateToken(newUser.id)

    // 5
    newUser.refreshToken = refreshToken
    await this.userRepository.save(newUser)

    return { accessToken, refreshToken }
  }

  // 1. Check email exists
  // 2. Check password
  // 3. Generate token (access token, refresh token) taken from auth service
  // 4. Save new refresh token and return token
  async login(loginDto: LoginDto) {
    // 1
    const user = await this.userRepository.findOneBy({
      email: loginDto.email
    })

    if (!user) throw new BadRequestRpcException(USER_MESSAGE_ERRORS.EMAIL_PASSWORD_INCORRECT)

    // 2
    const isMatch = await bcrypt.compare(loginDto.password, user.password)
    if (!isMatch) throw new BadRequestRpcException(USER_MESSAGE_ERRORS.EMAIL_PASSWORD_INCORRECT)

    // 3
    const { accessToken, refreshToken } = await this.authService.generateToken(user.id)

    // 4
    await this.userRepository.update({ id: user.id }, { refreshToken })

    return { accessToken, refreshToken }
  }

  // 1. Find user and update refresh token is null
  async logout(userId: string) {
    return 1
  }

  // 1. Generate token (access token, refresh token) taken from auth service
  // 2. Save new refresh token and return token
  async refreshToken(userId: string) {}
}
