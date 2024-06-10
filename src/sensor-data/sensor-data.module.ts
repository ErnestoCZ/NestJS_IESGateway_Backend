import { Module } from '@nestjs/common';
import { SensorDataController } from './sensor-data.controller';
import { SensorDataService } from './sensor-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorData } from './sensor-data.entity';
import { SensorModule } from 'src/sensor/sensor.module';

@Module({
  controllers: [SensorDataController],
  providers: [SensorDataService],
  imports: [TypeOrmModule.forFeature([SensorData]), SensorModule],
})
export class SensorDataModule {}
