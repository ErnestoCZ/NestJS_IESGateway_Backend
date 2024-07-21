import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { CreateSensorDto } from './dtos/createSensor.dto';
import { AuthGuard } from 'src/Guards/auth.guard';

@Controller('sensor')
@UseGuards(new AuthGuard())
export class SensorController {
  constructor(private sensorService: SensorService) {}

  @Get('/:id')
  findSensor(@Param('id') id: string) {
    return this.sensorService.findSensorById(Number(id));
  }

  @Get('/')
  findAllSensors() {
    return this.sensorService.findAll();
  }

  @Post()
  createSensor(@Body() body: CreateSensorDto) {
    return this.sensorService.createSensor(body);
  }
}
