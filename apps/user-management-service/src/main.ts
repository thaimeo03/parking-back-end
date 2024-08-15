import { BaseExceptionFilter, HttpAdapterHost, NestFactory } from '@nestjs/core'
import { UserManagementServiceModule } from './user-management-service.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserManagementServiceModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001
    }
  })

  const { httpAdapter } = app.get(HttpAdapterHost)

  app.useGlobalPipes(new ValidationPipe()) // Validation pipe is global
  app.useGlobalFilters(new BaseExceptionFilter(httpAdapter)) // Exception filter is global

  await app.listen()
}
bootstrap()
