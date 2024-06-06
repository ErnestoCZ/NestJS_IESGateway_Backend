import {
  Body,
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { FindUsersDto } from './dtos/findUsers.dto';
import { Serialize } from 'src/interceptors/transform/transform.interceptor';
import { UserDto } from './dtos/user.dto';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createNewUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(
      body.email,
      body.password,
      body.firstName,
      body.lastName,
      body?.isActive,
    );
  }

  @Get()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  findUsers(@Query() query: FindUsersDto) {
    return this.usersService.findUsers(query.email);
  }
}
