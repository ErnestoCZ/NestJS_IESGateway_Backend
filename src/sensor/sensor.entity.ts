import { SensorData } from 'src/sensor-data/sensor-data.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  device_name: string;

  @Column()
  device_eui: string;

  @Column()
  device_addr: string;

  @Column()
  application_name: string;

  @Column()
  application_id: string;

  @OneToMany(() => SensorData, (sensorData) => sensorData.sensor)
  sensorData: SensorData[];

  @CreateDateColumn()
  create_date: Date;

  @UpdateDateColumn()
  update_date: Date;
}
