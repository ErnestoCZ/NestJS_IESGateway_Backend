import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Sensor } from 'src/sensor/sensor.entity';

@Entity()
export class SensorData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  forceX: number;

  @Column()
  forceY: number;

  @Column()
  forceZ: number;

  @Column()
  temperature: number;

  @Column()
  rawData: string;

  @ManyToOne(() => Sensor, (sensor) => sensor.sensorData)
  sensor: Sensor;
}
