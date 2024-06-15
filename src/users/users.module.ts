import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AuthService } from './auth/auth.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, User, AuthService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService, User],
})
export class UsersModule {}
