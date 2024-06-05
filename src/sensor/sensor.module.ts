import { Module } from '@nestjs/common';
import { SensorController } from './sensor.controller';
import { SensorService } from './sensor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from './sensor.entity';

@Module({
  controllers: [SensorController],
  providers: [SensorService],
  imports: [TypeOrmModule.forFeature([Sensor])],
})
export class SensorModule {}
