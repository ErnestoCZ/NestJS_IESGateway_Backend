import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users.service';
import { User } from '../users.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signin(email: string, password: string) {
    const foundUserResult: User[] = await this.userService.findUsers(email);

    if (foundUserResult.length === 0) {
      throw new NotFoundException('User signin failed!');
    } else if (foundUserResult.length === 1) {
      //TODO signin check
    }
  }
  async signup() {}
}
