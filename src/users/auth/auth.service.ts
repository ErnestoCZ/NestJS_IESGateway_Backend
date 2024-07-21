import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { User } from '../users.entity';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';
import { CreateUserDto } from '../dtos/createUser.dto';
import { SignInUserDto } from '../dtos/signInUser.dto';
import * as JWT from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signin(userDetails: SignInUserDto, session: Record<string, any>) {
    const foundUserResult: User[] = await this.userService.findUsers(
      userDetails.email,
    );

    if (foundUserResult.length === 0) {
      throw new BadRequestException('wrong email or password');
    } else if (foundUserResult.length === 1) {
      if (compareSync(userDetails.password, foundUserResult.at(0).password)) {
        console.log(process.env.JWT_SECRET);
        const signedJWT = JWT.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: foundUserResult.at(0).id,
          },
          process.env.JWT_SECRET ?? '',
        );
        session.JWT = signedJWT;
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

  async signOut(session: Record<string, any>) {
    session.JWT = '';
    return session.JWT;
  }
}
