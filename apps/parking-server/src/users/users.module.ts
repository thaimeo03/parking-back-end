import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
  controllers: [UsersController]
})
export class UsersModule {}
