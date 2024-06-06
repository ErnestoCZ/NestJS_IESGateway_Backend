import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sensor } from './sensor.entity';
import { Repository } from 'typeorm';
import { CreateSensorDto } from './dtos/createSensor.dto';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(Sensor) private sensorRepository: Repository<Sensor>,
  ) {}
  async findSensorById(id: number): Promise<number> {
    const found = await this.sensorRepository.findOneBy({ id: id });
    if (found === null) {
      throw new NotFoundException(`Sensor not found with id ${id}`);
    }
    return 1;
  }

  async createSensor(sensor: CreateSensorDto) {
    const result = await this.sensorRepository.find({
      where: { deviceName: sensor.deviceName },
    });

    if (result.length === 0) {
      const newSensor: Sensor = this.sensorRepository.create(sensor);
      const saveResult = await this.sensorRepository.save(newSensor);
      return saveResult;
    } else {
    }
  }
}
