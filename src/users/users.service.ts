import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(
    email: string,
    password: string,
    fN: string,
    lN: string,
    isActive: boolean,
  ) {
    const newUserObject: Partial<User> = {
      email: email,
      password: password,
      firstName: fN,
      lastName: lN,
      isActive: isActive,
    };

    const user = this.usersRepository.create(newUserObject);
    const result = await this.usersRepository.save(user);
    return result;
  }

  async findUsers(email: string) {
    const findUsersResult = await this.usersRepository.find({
      where: { email: email },
    });

    if (findUsersResult.length === 0) {
      throw new NotFoundException(`User with email ${email} not found`);
    } else if (findUsersResult.length === 1) {
      return findUsersResult;
    } else {
      return findUsersResult;
    }
  }
}
