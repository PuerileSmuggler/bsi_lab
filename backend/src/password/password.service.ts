import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Password } from 'src/database/models/Password';
import { PasswordResponseDTO } from 'src/dto/Password';
import {
  CreatePasswordDTO,
  EditPasswordDTO,
  PaginationDTO,
  UserCredentials,
} from 'src/dto/User';
import { decodePassword, encodePassword } from 'src/utils/crypto';
import db from '../database/initializeDatabase';

@Injectable()
export class PasswordService {
  async getPasswords(user: UserCredentials, pagination: PaginationDTO) {
    const { count, page } = pagination;
    const dbUser = await db.User.findOne({
      where: {
        id: user.id,
      },
    });
    const passwords = await dbUser.getPasswords({
      offset: page * count,
      limit: count,
    });
    const dbCount = await dbUser.countPasswords();
    return { passwords, count: dbCount };
  }

  async createPassword(user: UserCredentials, password: CreatePasswordDTO) {
    return await db.Password.create({
      userId: user.id,
      ...password,
      password: encodePassword(password.password, password.key),
    }).catch((error) => {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    });
  }

  async deletePassword(id: number) {
    await (await db.Password.findByPk(id)).destroy().catch(() => {
      throw new InternalServerErrorException();
    });
  }

  async editPassword(
    user: UserCredentials,
    newPassword: Partial<EditPasswordDTO>,
  ): Promise<[number, Array<Password>]> {
    const dbUser = await db.User.findByPk(user.id);
    if (await dbUser.hasPassword(newPassword.id)) {
      const { id, password, ...rest } = newPassword;
      return await db.Password.update(
        {
          ...rest,
          password: encodePassword(password, newPassword.key),
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

  async findOne(
    user: UserCredentials,
    id: string,
  ): Promise<PasswordResponseDTO> {
    const passwords = await (await db.User.findByPk(user.id)).getPasswords({
      where: { id },
    });
    if (passwords.length === 0) {
      throw new HttpException('Not found', HttpStatus.BAD_REQUEST);
    }
    const { login, description, webAddress } = passwords[0];
    return { login, description, webAddress };
  }

  async decodePassword({
    password,
    key,
  }: {
    password: string;
    key: string;
  }): Promise<string> {
    return decodePassword(password, key);
  }
}
