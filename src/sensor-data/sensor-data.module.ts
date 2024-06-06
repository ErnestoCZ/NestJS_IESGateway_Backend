import { Module } from '@nestjs/common';
import { SensorDataController } from './sensor-data.controller';
import { SensorDataService } from './sensor-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorData } from './sensor-data.entity';

@Module({
  controllers: [SensorDataController],
  providers: [SensorDataService],
  imports: [TypeOrmModule.forFeature([SensorData])],
})
export class SensorDataModule {}
