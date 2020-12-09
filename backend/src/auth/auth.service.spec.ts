import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { Op } from 'sequelize';
import { LoginLog } from 'src/database/models/LoginLog';
import db from '../../src/database/initializeDatabase';
import { User } from '../../src/database/models/User';
import { UsersService } from '../../src/user/users.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

describe('AuthService', () => {
  let auth: TestingModule;
  let user: User;
  let authService: AuthService;

  beforeAll(async () => {
    auth = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: 'justANormalSecret',
          signOptions: { expiresIn: '6000s' },
        }),
      ],
      providers: [AuthService, JwtStrategy, LocalStrategy, UsersService],
      exports: [AuthService],
    }).compile();
    authService = auth.get<AuthService>(AuthService);
    db;
    user = await db.User.create({
      login: 'test',
      isPasswordKeptAsHash: true,
      password: 'test',
      salt: 'test',
    });
  });

  afterAll(async () => {
    await user.destroy();
  });

  describe('timeout', () => {
    it.each([
      [0, 0],
      [1, 0],
      [2, 5],
      [3, 10],
      [4, 120],
      [5, 120],
    ])(
      'should return proper login timeout %i tries = %i s timeout',
      (tries, expected) => {
        const timeout = authService.getLoginTimeout(tries);
        expect(timeout).toBe(expected);
      },
    );
    it.each([
      [0, 0],
      [1, 0],
      [2, 5],
      [3, 10],
      [4, 9999],
      [5, 9999],
    ])(
      'should return proper IP timeout %i tries = %i s timeout',
      (tries, expected) => {
        const timeout = authService.getIpTimeout(tries);
        expect(timeout).toBe(expected);
      },
    );
  });
  describe('Subsequent logins', () => {
    it('should clear existing ip login records', async (done) => {
      await db.LoginLog.create({
        ip: 'test',
        login: 'test',
      });
      await authService.clearIpBlock({ ip: 'test' });
      const logs = await db.LoginLog.findAll({ where: { ip: 'test' } });
      setTimeout(() => {
        expect(logs.length).toBe(4);
        done();
      }, 1000);
    });

    it('should clear existing ip or login records', async () => {
      await db.LoginLog.create({
        ip: 'test1',
        login: 'test',
      });
      await db.LoginLog.create({
        ip: 'test',
        login: 'test',
      });
      await authService.handleSubsequentLoginSuccess('test', 'test');
      const logs = await db.LoginLog.findAll({
        where: { [Op.or]: [{ ip: 'test' }, { login: 'test' }] },
      });
      expect(logs.length).toBe(2);
    });

    it.each([
      [0, 0, null],
      [1, 0, null],
      [2, 0, 5],
      [3, 0, 10],
      [4, 0, 120],
      [4, 3, 120],
      [3, 3, 10],
      [3, 4, 9999],
    ])(
      'should return proper timeout afet %i login and %i IP attempts',
      async (loginCount, ipCount, expectedTimeout) => {
        let logs: Array<LoginLog> = [];
        for (let i = 0; i < loginCount; i++) {
          logs.push(
            await db.LoginLog.create({
              ip: i.toString(),
              login: 'test',
            }),
          );
        }
        for (let i = 0; i < ipCount; i++) {
          logs.push(
            await db.LoginLog.create({
              ip: 'test',
              login: `test${i}`,
            }),
          );
        }
        const timeout = await authService.handleSubsequentLogin('test', 'test');
        expect(timeout).toBe(expectedTimeout);
        logs.forEach(async (log) => {
          await log.destroy();
        });
      },
    );
    it('should throw an exception if timeout is defined', async () => {
      let logs: Array<LoginLog> = [];
      for (let i = 0; i < 5; i++) {
        logs.push(
          await db.LoginLog.create({
            ip: 'test',
            login: 'test',
          }),
        );
      }

      try {
        await authService.login('test', 'test', { ip: 'test' });
      } catch (error) {
        expect(error.message).toBe('Unauthorized');
      }
      logs.forEach(async (element) => {
        await element.destroy();
      });
    });
  });
});
