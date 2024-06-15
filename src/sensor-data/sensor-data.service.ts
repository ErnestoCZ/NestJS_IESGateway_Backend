import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SensorData } from './sensor-data.entity';
import { Repository } from 'typeorm';
import { SensorService } from 'src/sensor/sensor.service';
import { CreateSensorDataDto } from './dtos/createSensorData.dto';

@Injectable()
export class SensorDataService {
  constructor(
    @InjectRepository(SensorData)
    private sensorDataRepository: Repository<SensorData>,
    private sensorService: SensorService,
  ) {}

  async createSensorDataPoint(sensorDataInformation: CreateSensorDataDto) {
    //Check Sensor exists
    const foundSensors = await this.sensorService.findSensor(
      sensorDataInformation.device_name,
      sensorDataInformation.device_eui,
      sensorDataInformation.device_addr,
    );

    if (foundSensors.length === 1) {
      //if exits then create related DataPoint to this Sensor
      const Sensor = foundSensors.at(0);

      const newSensorData = this.sensorDataRepository.create({
        forceX: sensorDataInformation.forceX,
        forceY: sensorDataInformation.forceY,
        forceZ: sensorDataInformation.forceZ,
        temperature: sensorDataInformation.temperature,
        rawData: sensorDataInformation.rawData,
        sensor: Sensor,
      });
      const storeResult = await this.sensorDataRepository.save(newSensorData);

      return storeResult;
    } else if (foundSensors.length === 0) {
      //else create Sensor and then create a DataPoint related to this Sensor
      const newSensor = await this.sensorService.createSensor({
        device_addr: sensorDataInformation.device_addr,
        device_eui: sensorDataInformation.device_eui,
        device_name: sensorDataInformation.device_name,
        application_name: sensorDataInformation.application_name,
        application_id: sensorDataInformation.application_id,
      });
      const newSensorData = this.sensorDataRepository.create({
        forceX: sensorDataInformation.forceX,
        forceY: sensorDataInformation.forceY,
        forceZ: sensorDataInformation.forceZ,
        temperature: sensorDataInformation.temperature,
        rawData: sensorDataInformation.rawData,
        sensor: newSensor,
      });

      return this.sensorDataRepository.save(newSensorData);
    } else {
      throw new HttpException(
        'Multiple Sensor found : SensorData cannot be assigned to single Sensor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return '';
  }
}
