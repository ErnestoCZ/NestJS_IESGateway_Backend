import { IsString, IsNumber } from 'class-validator';
import { CreateSensorDto } from 'src/sensor/dtos/createSensor.dto';

export class CreateSensorDataDto extends CreateSensorDto {
  @IsNumber()
  forceX: number;

  @IsNumber()
  forceY: number;

  @IsNumber()
  forceZ: number;

  @IsNumber()
  temperature;

  @IsString()
  rawData: string;
}
