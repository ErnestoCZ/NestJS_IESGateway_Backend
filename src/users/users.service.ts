import { BadRequestException, Injectable } from '@nestjs/common';
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
  ): Promise<User> {
    const foundUsers = await this.findUsers(email);
    console.log(foundUsers);
    if (foundUsers.length === 0) {
      const newUserObject: Partial<User> = {
        email: email,
        password: password,
        firstName: fN,
        lastName: lN,
        isActive: isActive,
      };

      const createUser = this.usersRepository.create(newUserObject);
      const createdUser = await this.usersRepository.save(createUser);
      return createdUser;
    } else {
      throw new BadRequestException('User already exists');
    }
  }

  async findUsers(email: string): Promise<User[]> | null {
    const findUsersResult = await this.usersRepository.find({
      where: { email: email },
    });

    if (findUsersResult.length === 1) {
      return findUsersResult;
    } else {
      return findUsersResult;
    }
  }
}
