import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDTO, UserCredentials } from '../../src/dto/User';
import {
  decodePassword,
  encodePassword,
  hashPassword,
} from '../../src/utils/crypto';
import db from '../database/initializeDatabase';

@Injectable()
export class UsersService {
  async createUser(user: RegisterUserDTO) {
    const salt = Math.random().toString(36).substr(2, 5);
    return await db.User.create({
      login: user.login,
      password: hashPassword(user.encryption, user.password, salt),
      salt,
      isPasswordKeptAsHash: user.encryption === 'hmac' ? true : false,
    }).catch((error) => {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    });
  }

  async editUser(
    user: UserCredentials,
    password: {
      oldPassword: string;
      password: string;
      key: string;
      encryption: 'hmac' | 'sha512';
    },
  ) {
    const salt = Math.random().toString(36).substr(2, 5);
    const dbUser = await db.User.findByPk(user.id);
    const oldPassword = dbUser.password;
    const encryption = dbUser.isPasswordKeptAsHash ? 'hmac' : 'sha512';
    if (
      oldPassword ===
      hashPassword(encryption, password.oldPassword, dbUser.salt)
    ) {
      await db.User.update(
        {
          password: hashPassword(password.encryption, password.password, salt),
          salt,
          isPasswordKeptAsHash: password.encryption === 'hmac' ? true : false,
        },
        {
          where: {
            id: user.id,
          },
        },
      ).catch(() => {
        throw new InternalServerErrorException();
      });
      return await dbUser.getPasswords().then(async (passwords) => {
        return await Promise.all(
          passwords.map(async (pass) => {
            const decodedPassword = decodePassword(
              pass.password,
              password.oldPassword,
            );
            return await db.Password.update(
              {
                password: encodePassword(decodedPassword, password.password),
              },
              {
                where: {
                  id: pass.id,
                },
              },
            );
          }),
        );
      });
    } else {
      throw new UnauthorizedException();
    }
  }

  async findOne(login: string) {
    return await db.User.findOne({
      where: {
        login,
      },
    });
  }
}
