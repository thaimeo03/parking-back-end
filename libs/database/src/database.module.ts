import { Module } from '@nestjs/common'
import { DatabaseService } from './database.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import dataSourceOptions from './data-source'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local'
    }),
    TypeOrmModule.forRoot(dataSourceOptions)
  ],
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}
