import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { config } from 'dotenv'
import { Logger } from '@nestjs/common'

config({ path: '.env.local' })

const logger = new Logger('Data source')
logger.log(`Connecting to database: ${process.env.POSTGRES_HOST}, ${process.env.POSTGRES_PORT}`)

const dataSourceOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME || 'postgres',
  entities: [User],
  synchronize: true
}

export default dataSourceOptions
