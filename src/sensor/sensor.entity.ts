import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deviceName: string;

  @Column()
  devEui: string;

  @Column()
  devAddr: string;

  @Column()
  applicationName: string;
}
