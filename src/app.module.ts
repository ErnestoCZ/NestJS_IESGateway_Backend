import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SensorModule } from './sensor/sensor.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Sensor } from './sensor/sensor.entity';
import { SensorDataModule } from './sensor-data/sensor-data.module';
import { SensorData } from './sensor-data/sensor-data.entity';

@Module({
  imports: [
    SensorModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'gateway',
      entities: [User, Sensor, SensorData],
      synchronize: true,
      retryDelay: 5000,
      retryAttempts: 10,
    }),
    SensorDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
