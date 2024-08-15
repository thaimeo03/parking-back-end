import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@app/database/entities/user.entity'
import { AuthenticationStrategy } from './strategies/authentication.strategy'

@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [AuthService, AuthenticationStrategy],
  exports: [AuthService]
})
export class AuthModule {}
