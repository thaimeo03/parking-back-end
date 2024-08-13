import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy } from 'passport-jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '@app/database/entities/user.entity'
import { Repository } from 'typeorm'
import { config } from 'dotenv'

config({ path: '.env.local' })

interface IJwtPayload {
  userId: string
  type: string
  iat: number
  exp: number
}

@Injectable()
export class AuthenticationStrategy extends PassportStrategy(Strategy, 'authentication') {
  @InjectRepository(User) private userRepository: Repository<User>

  constructor() {
    super({
      jwtFromRequest: AuthenticationStrategy.extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET
    })
  }

  private static extractJwtFromCookie(req: Request) {
    if (req.cookies && 'access_token' in req.cookies) {
      return req.cookies.access_token
    }
    return null
  }

  async validate(payload: IJwtPayload) {
    const user = await this.userRepository.findOneBy({ id: payload.userId })

    if (!user) return null

    return {
      userId: user.id,
      role: user.role
    }
  }
}
