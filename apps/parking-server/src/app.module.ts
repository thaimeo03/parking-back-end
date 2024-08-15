import { Module } from '@nestjs/common'
import { HelloWorldModule } from './hello-world/hello-world.module'
import { UsersController } from './users/users.controller'
import { UsersModule } from './users/users.module'

@Module({
  imports: [HelloWorldModule, UsersModule],
  controllers: [UsersController],
  providers: []
})
export class AppModule {}
