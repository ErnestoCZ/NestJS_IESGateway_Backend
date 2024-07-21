import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { SensorDataService } from './sensor-data.service';
import { CreateSensorDataDto } from './dtos/createSensorData.dto';
import { AuthGuard } from 'src/Guards/auth.guard';

@Controller('sensor-data')
@UseGuards(new AuthGuard())
export class SensorDataController {
  constructor(private sensorDataService: SensorDataService) {}

  @Post()
  createSensorDataEntry(@Body() body: CreateSensorDataDto) {
    return this.sensorDataService.createSensorDataPoint(body);
  }
}
