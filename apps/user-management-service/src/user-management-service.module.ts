import { DatabaseModule } from '@app/database'
import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [],
  providers: []
})
export class UserManagementServiceModule {}
