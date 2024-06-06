import { IsString } from 'class-validator';

export class CreateSensorDto {
  @IsString()
  deviceName: string;

  @IsString()
  deviceEui: string;

  @IsString()
  deviceAddr: string;

  @IsString()
  applicationName: string;
}
