import { Controller, Get } from '@nestjs/common';
import { VehicleManagementServiceService } from './vehicle-management-service.service';

@Controller()
export class VehicleManagementServiceController {
  constructor(private readonly vehicleManagementServiceService: VehicleManagementServiceService) {}

  @Get()
  getHello(): string {
    return this.vehicleManagementServiceService.getHello();
  }
}
