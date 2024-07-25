import { Test, TestingModule } from '@nestjs/testing';

import { UnauthorizedException } from '@nestjs/common';
import { LocalStrategy } from '../local.strategy';
import { AuthService } from '../auth.service';

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    strategy = module.get<LocalStrategy>(LocalStrategy);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('validate', () => {
    it('should return user if validation is successful', async () => {
      const user = { id: '1', userName: 'test', passWord: 'hashed' };
      jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
      
      const result = await strategy.validate('test', 'password');
      expect(result).toEqual(user);
    });

    it('should throw UnauthorizedException if validation fails', async () => {
      jest.spyOn(authService, 'validateUser').mockResolvedValue(null);
      
      await expect(strategy.validate('test', 'password'))
        .rejects
        .toThrow(UnauthorizedException);
    });
  });
});
