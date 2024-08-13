import { Test, TestingModule } from '@nestjs/testing';
import { VehicleManagementServiceController } from './vehicle-management-service.controller';
import { VehicleManagementServiceService } from './vehicle-management-service.service';

describe('VehicleManagementServiceController', () => {
  let vehicleManagementServiceController: VehicleManagementServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [VehicleManagementServiceController],
      providers: [VehicleManagementServiceService],
    }).compile();

    vehicleManagementServiceController = app.get<VehicleManagementServiceController>(VehicleManagementServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(vehicleManagementServiceController.getHello()).toBe('Hello World!');
    });
  });
});
