import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SensorModule } from './sensor/sensor.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Sensor } from './sensor/sensor.entity';

@Module({
  imports: [
    SensorModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'mysecretpassword',
      database: 'gateway',
      entities: [User, Sensor],
      synchronize: true,
      retryDelay: 5000,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
