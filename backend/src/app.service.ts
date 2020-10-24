import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import db from './database/initializeDatabase';
import {
  CreatePasswordDTO,
  RegisterUserDTO,
  UserCredentials,
} from './dto/User';

@Injectable()
export class AppService {
  constructor(private authService: AuthService) {}
  async createUser(user: RegisterUserDTO) {
    const salt = Math.random().toString(36).substr(2, 5);
    return await db.User.create({
      login: user.login,
      password: this.authService.hashPassword('hmac', user.password, salt),
      salt,
      isPasswordKeptAsHash: user.encryption === 'hmac' ? true : false,
    }).catch((error) => {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    });
  }

  async createPassword(user: UserCredentials, password: CreatePasswordDTO) {
    return await db.Password.create({
      userId: user.id,
      webAddress: password.webAddress,
      description: password.description,
      login: password.login,
      password: password.password,
    }).catch((error) => {
      console.log(error.message);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    });
  }
}
