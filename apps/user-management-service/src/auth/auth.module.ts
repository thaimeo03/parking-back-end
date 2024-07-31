import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule, JwtModule.register({ global: true })],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
