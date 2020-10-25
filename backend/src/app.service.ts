import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import db from './database/initializeDatabase';
import {
  CreatePasswordDTO,
  EditPasswordDTO,
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
    const key = (
      await db.User.findOne({
        where: {
          id: user.id,
        },
      })
    ).password;
    return await db.Password.create({
      userId: user.id,
      ...password,
      password: this.authService.encodePassword(password.password, key),
    }).catch((error) => {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    });
  }

  async editPassword(user: UserCredentials, newPassword: EditPasswordDTO) {
    const dbUser = await db.User.findByPk(user.id);
    if (await dbUser.hasPassword(newPassword.id)) {
      const { id, password, ...rest } = newPassword;
      return await db.Password.update(
        {
          ...rest,
          password: this.authService.encodePassword(password, dbUser.password),
        },
        {
          where: {
            id: newPassword.id,
          },
        },
      ).catch(() => {
        throw new InternalServerErrorException();
      });
    }
    throw new UnauthorizedException();
  }

  async decodePassword(
    user: UserCredentials,
    password: string,
  ): Promise<string> {
    const key = (
      await db.User.findOne({
        where: {
          id: user.id,
        },
      })
    ).password;
    return this.authService.decodePassword(password, key);
  }
}
