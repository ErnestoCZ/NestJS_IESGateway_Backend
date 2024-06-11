import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sensor } from './sensor.entity';
import { Repository } from 'typeorm';
import { CreateSensorDto } from './dtos/createSensor.dto';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(Sensor) private sensorRepository: Repository<Sensor>,
  ) {}
  async findSensorById(id: number): Promise<Sensor> {
    const found = await this.sensorRepository.findOneBy({ id: id });
    if (found === null) {
      throw new NotFoundException(`Sensor with id ${id} not found`);
    }
    return found;
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
      throw new HttpException(
        `Sensor with name ${sensor.deviceName} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findSensor(deviceName: string, deviceEui: string, deviceAddr: string) {
    const result = await this.sensorRepository.find({
      where: {
        deviceName: deviceName,
        deviceAddr: deviceAddr,
        deviceEui: deviceEui,
      },
    });
    return result;
  }

  async findAll() {
    const result = await this.sensorRepository
      .createQueryBuilder('sensor')
      .select('*')
      .getRawMany();
    return result;
  }
}
