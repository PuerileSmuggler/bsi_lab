import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import * as crypto from 'crypto';
import { User } from 'src/database/models/User';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class AuthService {
  constructor(
    private appService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<User | null> {
    const user = await this.appService.findOne(login);
    const encryption = user.isPasswordKeptAsHash ? 'sha512' : 'hmac';
    if (
      user &&
      user.password === this.hashPassword(encryption, password, user.salt)
    ) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { login: user.login, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      key: user.password.substr(0, 16),
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

  encodePassword(password: string, key: string): string {
    const iv = 'V8MMkXs5pkVxzUr7';
    const cipher = crypto.createCipheriv('aes-128-cbc', key.substr(0, 16), iv);
    let buffer = cipher.update(password, 'utf8', 'hex');
    buffer += cipher.final('hex');
    return buffer;
  }

  decodePassword(password: string, key: string): string {
    const iv = 'V8MMkXs5pkVxzUr7';
    const cipher = crypto.createDecipheriv(
      'aes-256-gcm',
      key.substr(0, 32),
      iv,
    );
    let buffer = cipher.update(password, 'hex', 'utf8');
    buffer += cipher.final('utf8');
    return buffer;
  }
}
