import { User } from '@app/database/entities/user.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async testAuth() {
    const user = this.userRepository.create({
      email: 'admin3',
      name: 'admin',
      password: 'admin',
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
      role: 'PARKING_OWNER'
    })

    return this.userRepository.save(user)
  }
}
