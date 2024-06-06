import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService, User],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService, User],
})
export class UsersModule {}
