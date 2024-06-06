import { SensorData } from 'src/sensor-data/sensor-data.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deviceName: string;

  @Column()
  deviceEui: string;

  @Column()
  deviceAddr: string;

  @Column()
  applicationName: string;

  @Column()
  applicationId: string;

  @OneToMany(() => SensorData, (sensorData) => sensorData.sensor)
  sensorData: SensorData[];
}
