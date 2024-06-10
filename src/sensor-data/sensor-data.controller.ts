import { Controller, Post, Body } from '@nestjs/common';
import { SensorDataService } from './sensor-data.service';
import { CreateSensorDataDto } from './dtos/createSensorData.dto';

@Controller('sensor-data')
export class SensorDataController {
  constructor(private sensorDataService: SensorDataService) {}

  @Post()
  createSensorDataEntry(@Body() body: CreateSensorDataDto) {
    return this.sensorDataService.createSensorDataPoint(body);
  }
}
