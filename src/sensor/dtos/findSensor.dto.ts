import { IsString } from 'class-validator';

export class FindSensorDto {
  @IsString()
  deviceName: string;

  @IsString()
  deviceEui: string;

  @IsString()
  deviceAddr: string;
}
