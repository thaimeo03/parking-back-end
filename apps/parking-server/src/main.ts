import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { AllExceptionsFilter } from './all-exceptions.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const { httpAdapter } = app.get(HttpAdapterHost)

  app.useGlobalPipes(new ValidationPipe()) // Validation pipe is global
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter)) // Exception filter is global
  app.enableCors()

  await app.listen(3000)
}
bootstrap()
