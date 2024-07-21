import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { User } from '../users.entity';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';
import { CreateUserDto } from '../dtos/createUser.dto';
import { SignInUserDto } from '../dtos/signInUser.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signin(userDetails: SignInUserDto) {
    const foundUserResult: User[] = await this.userService.findUsers(
      userDetails.email,
    );

    if (foundUserResult.length === 0) {
      throw new BadRequestException('wrong email or password');
    } else if (foundUserResult.length === 1) {
      if (compareSync(userDetails.password, foundUserResult.at(0).password)) {
        //TODO assign JWT in COOKIES OR SESSION

        console.log('password is correct');
      } else {
        console.log('password is not correct');
        throw new BadRequestException();
      }
    }
  }
  async signup(userDetails: CreateUserDto) {
    const foundUser: User[] = await this.userService.findUsers(
      userDetails.email,
    );
    if (foundUser.length === 0) {
      //TODO hash new password
      const salt: string = genSaltSync(10);
      const hash: string = hashSync(userDetails.password, salt);
      const createdUser = await this.userService.createUser(
        userDetails.email,
        hash,
        userDetails.firstName,
        userDetails.lastName,
        userDetails.isActive,
      );
      return createdUser;
    } else {
      throw new BadRequestException('User already exists.');
    }
  }
}
