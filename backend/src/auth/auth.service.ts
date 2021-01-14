import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import * as moment from 'moment';
import { Op } from 'sequelize';
import db from '../database/initializeDatabase';
import { User } from '../database/models/User';
import { UsersService } from '../user/users.service';
import { hashPassword } from '../utils/crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    login: string,
    password: string,
    ip: string,
  ): Promise<User> {
    const user = await this.usersService.findOne(login);
    const timeout = await this.handleSubsequentLogin(login, ip);
    if (timeout) {
      throw new HttpException(
        { timeout, statusCode: 401, message: 'Unauthorized' },
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (!user) {
      db.LoginLog.create({
        ip,
        login,
      });
      throw new HttpException('Unathorized', HttpStatus.UNAUTHORIZED);
    }
    const encryption = user.isPasswordKeptAsHash ? 'hmac' : 'sha512';
    if (user.password === hashPassword(encryption, password, user.salt)) {
      return user;
    }
    db.LoginLog.create({
      ip,
      login,
    });
    throw new HttpException('Unathorized', HttpStatus.UNAUTHORIZED);
  }

  async login(username: string, password: string, request: any) {
    const user = await this.validateUser(username, password, request.ip);
    await this.handleSubsequentLoginSuccess(username, request.ip);
    const payload = { login: user.login, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      key: user.password.substr(0, 16),
      ttl: 6000,
    };
  }

  async handleSubsequentLoginSuccess(login: string, ip: string) {
    (
      await db.LoginLog.findAll({
        where: {
          [Op.or]: [{ login }, { ip }],
        },
      })
    ).forEach(async (element) => {
      await element.destroy();
    });
  }

  async handleSubsequentLogin(login: string, ip: string) {
    const subLogin = await db.LoginLog.findAll({
      where: {
        login,
      },
      order: [['createdAt', 'desc']],
    });
    const subIp = await db.LoginLog.findAll({
      where: {
        ip,
      },
      order: [['createdAt', 'desc']],
    });
    if (subLogin.length === 0 && subIp.length === 0) {
      return null;
    }
    if (subLogin.length > subIp.length && subIp.length < 4) {
      const timeout = this.getLoginTimeout(subLogin.length);
      if (
        moment(subLogin[0].createdAt)
          .add(timeout, 'seconds')
          .isBefore(moment(new Date()))
      ) {
        return null;
      }
      return timeout;
    }
    const timeout = this.getIpTimeout(subIp.length);
    if (
      moment(subIp[0].createdAt).add(timeout, 'seconds').isBefore(moment()) &&
      timeout !== 9999
    ) {
      return null;
    }
    return timeout;
  }

  getLoginTimeout(tries: number) {
    switch (tries) {
      case 0:
      case 1: {
        return 0;
      }
      case 2: {
        return 5;
      }
      case 3: {
        return 10;
      }
      default: {
        return 120;
      }
    }
  }

  getIpTimeout(tries: number) {
    switch (tries) {
      case 0:
      case 1: {
        return 0;
      }
      case 2: {
        return 5;
      }
      case 3: {
        return 10;
      }
      default: {
        return 9999;
      }
    }
  }

  async clearIpBlock(request: any) {
    (
      await db.LoginLog.findAll({
        where: {
          ip: request.ip,
        },
      })
    ).forEach(async (element) => {
      await element.destroy();
    });
  }

  async refreshToken({ login }: { login: string; id: string }) {
    const user = await this.usersService.findOne(login);
    const payload = { login: user.login, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      key: user.password.substr(0, 16),
      ttl: 6000,
    };
  }
}
