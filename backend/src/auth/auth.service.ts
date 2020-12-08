import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { User } from 'src/database/models/User';
import { hashPassword } from 'src/utils/crypto';
import { UsersService } from '../user/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne(login);
    if (!user) throw new HttpException('Unathorized', HttpStatus.UNAUTHORIZED);
    const encryption = user.isPasswordKeptAsHash ? 'hmac' : 'sha512';
    if (user.password === hashPassword(encryption, password, user.salt)) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { login: user.login, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      key: user.password.substr(0, 16),
      ttl: 6000,
    };
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
