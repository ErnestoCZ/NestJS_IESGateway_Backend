import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './users.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const fakeUsersService: Partial<UsersService> = {
      createUser: (
        email: string,
        password: string,
        fN: string,
        lN: string,
        isActive: boolean,
      ): Promise<User> => {
        return Promise.resolve({ id: 1, email: email } as User);
      },
      findUsers: (email: string): Promise<User[]> | null => {
        return Promise.resolve([{ id: 1, email: email }] as User[]);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createUser()', async () => {
    const user = await service.createUser(
      'test3@test.com',
      'sadfsaSG&1123ws',
      'firstNameTest',
      'lastNameTest',
      true,
    );
    console.log(user);
    expect(user).toBeDefined();
    expect(user).toStrictEqual({
      id: 1,
      email: 'test3@test.com',
    });
  });

  it('findUser', async () => {
    const user: User[] = await service.findUsers('test3@test.com');
    expect(user).toStrictEqual([{ id: 1, email: 'test3@test.com' }]);
  });
});
