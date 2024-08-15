import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { UserManagementServiceModule } from './user-management-service.module'
import { BaseRpcExceptionFilter, MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserManagementServiceModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001
    }
  })

  app.useGlobalPipes(new ValidationPipe()) // Validation pipe is global
  app.useGlobalFilters(new BaseRpcExceptionFilter()) // Exception filter is global

  await app.listen()
}
bootstrap()
