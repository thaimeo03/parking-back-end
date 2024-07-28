import { Module } from '@nestjs/common'
import { DatabaseService } from './database.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'postgres',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true
    })
  ],
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}
