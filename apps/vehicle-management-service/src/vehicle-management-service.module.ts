import { Module } from '@nestjs/common';
import { VehicleManagementServiceController } from './vehicle-management-service.controller';
import { VehicleManagementServiceService } from './vehicle-management-service.service';

@Module({
  imports: [],
  controllers: [VehicleManagementServiceController],
  providers: [VehicleManagementServiceService],
})
export class VehicleManagementServiceModule {}
