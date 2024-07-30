import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [JwtModule.register({ global: true })],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
