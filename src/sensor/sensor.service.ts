import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sensor } from './sensor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(Sensor) private sensorRepository: Repository<Sensor>,
  ) {}
}
