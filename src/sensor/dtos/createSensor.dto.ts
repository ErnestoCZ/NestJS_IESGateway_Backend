import { IsString } from 'class-validator';

export class CreateSensorDto {
  @IsString()
  device_name: string;

  @IsString()
  device_eui: string;

  @IsString()
  device_addr: string;

  @IsString()
  application_name: string;

  @IsString()
  application_id: string;
}
