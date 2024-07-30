import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { UserManagementServiceModule } from './user-management-service.module'
import { ValidationPipe } from '@nestjs/common'
import { AllExceptionsFilter } from 'apps/parking-server/src/all-exceptions.filter'

async function bootstrap() {
  const app = await NestFactory.create(UserManagementServiceModule)

  const { httpAdapter } = app.get(HttpAdapterHost)

  app.useGlobalPipes(new ValidationPipe()) // Validation pipe is global
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter)) // Exception filter is global
  app.enableCors()

  await app.listen(3000)
}
bootstrap()
