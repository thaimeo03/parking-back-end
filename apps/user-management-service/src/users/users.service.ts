import { User } from '@app/database/entities/user.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { AuthService } from '../auth/auth.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private authService: AuthService
  ) {}

  // 1. Check email exists
  // 2. Hash password
  // 3. Generate token (access token, refresh token) taken from auth service
  async register(createUserDto: CreateUserDto) {
    return createUserDto
  }
}
