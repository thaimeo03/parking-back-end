import { ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { ROLE } from '@app/common/enums/role.enum'
import { ROLES_KEY } from '@app/common/decorators/roles.decorator'

export class AuthenticationGuard extends AuthGuard('authentication') {
  private reflector = new Reflector()

  constructor() {
    super()
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException()
    }

    // Get roles from decorator and check if user has roles
    const roles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [context.getHandler(), context.getClass()])

    if (!roles) return user

    if (!roles.includes(user.role)) throw new ForbiddenException()

    return user
  }
}
