import { Module } from '@nestjs/common'
import { HelloWorldModule } from './hello-world/hello-world.module'
import { UsersController } from './users/users.controller'
import { UsersModule } from './users/users.module'
import { DatabaseModule } from '@app/database'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@app/database/entities/user.entity'
import { AuthModule } from '@app/common/auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    DatabaseModule,
    HelloWorldModule,
    UsersModule
  ],
  controllers: [UsersController],
  providers: []
})
export class AppModule {}
