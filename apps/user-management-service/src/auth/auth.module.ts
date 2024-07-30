import { User } from '@app/database/entities/user.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from './auth.service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [AuthService]
})
export class AuthModule {}
