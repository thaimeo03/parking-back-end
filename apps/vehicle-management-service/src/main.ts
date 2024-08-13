import { NestFactory } from '@nestjs/core';
import { VehicleManagementServiceModule } from './vehicle-management-service.module';

async function bootstrap() {
  const app = await NestFactory.create(VehicleManagementServiceModule);
  await app.listen(3000);
}
bootstrap();
