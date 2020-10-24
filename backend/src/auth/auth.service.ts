import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import * as crypto from 'crypto';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class AuthService {
  constructor(
    private appService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.appService.findOne(login);
    const encryption = user.isPasswordKeptAsHash ? 'sha512' : 'hmac';
    if (
      user &&
      user.password === this.hashPassword(encryption, password, user.salt)
    ) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  hashPassword(
    encryption: 'sha512' | 'hmac',
    password: string,
    salt: string,
  ): string {
    const passwordString = salt + password + 'wIDmCexWa6';
    return encryption === 'hmac'
      ? crypto
          .createHmac('sha512', 'ja0Afw0k1kdazxc')
          .update(passwordString)
          .digest('hex')
      : crypto
          .createHash(encryption, { encoding: 'hex' })
          .update(passwordString)
          .digest('hex');
  }
}
