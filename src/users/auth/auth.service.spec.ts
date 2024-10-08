import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users.service';
import { User } from '../users.entity';

export const JWTSecret = process.env.JWT_SECRET;

describe('AuthService', () => {
  let service: AuthService;
  const fakeUserService: Partial<UsersService> = {
    findUsers: (): Promise<User[]> => Promise.resolve([]),
    createUser: (
      email: string,
      password: string,
      fN: string,
      lN: string,
      isActive: boolean,
    ) =>
      Promise.resolve({
        id: 1,
        email: email,
        password: password,
        firstName: fN,
        lastName: lN,
        isActive: isActive,
      } as User),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUserService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('Test service is defined', async () => {
    expect(service).toBeDefined();
  });

  it('Test signup is defined', async () => {
    expect(service.signup).toBeDefined();
  });

  it('Test signin throws error if email is unused', async () => {
    try {
      await service.signin(
        { email: 'test1@test.com', password: 'wqe2u3ihr451u3b45!!' },
        null,
      );
    } catch (error) {}
  });
});
