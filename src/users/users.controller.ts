import {
  Body,
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  Query,
  Session,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { FindUsersDto } from './dtos/findUsers.dto';
import { Serialize } from 'src/interceptors/transform/transform.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth/auth.service';
import { SignInUserDto } from './dtos/signInUser.dto';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  signupUser(@Body() body: CreateUserDto) {
    return this.authService.signup(body);
  }

  @Post('/signin')
  signinUser(
    @Body() body: SignInUserDto,
    @Session() session: Record<string, any>,
  ) {
    return this.authService.signin(body, session);
  }
  @Get('/signout')
  signOutUser(@Session() session: Record<string, any>) {
    this.authService.signOut(session);
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
