import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SensorModule } from './sensor/sensor.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorDataModule } from './sensor-data/sensor-data.module';
import { User } from './users/users.entity';
import { Sensor } from './sensor/sensor.entity';
import { SensorData } from './sensor-data/sensor-data.entity';
// import { dataSourceOptions } from '../db/data-source';

@Module({
  imports: [
    SensorModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: '1234',
      database: 'testDB',
      entities: [User, Sensor, SensorData],
      synchronize: true,
    }),
    SensorDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
