import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { Password } from 'src/database/models/Password';
import { PasswordResponseDTO, SharedPasswordsDTO, SharePasswordDTO } from 'src/dto/Password';
import {
  CreatePasswordDTO,
  EditPasswordDTO,
  PaginationDTO,
  UserCredentials
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
      where: {
        removed: false,
      }
    });
    const dbCount = await dbUser.countPasswords();
    return { passwords, count: dbCount };
  }

  async getSharedPasswords(user: UserCredentials) {
    const passwordUsers = await db.PasswordUsers.findAll({
      where: {
        userId: user.id,
      },
      include: [
        { 
          model: db.Password as any,
          where: {
            removed: false
          },
        }
      ]
    });
    const passwords: Array<SharedPasswordsDTO> = [];
    passwordUsers.forEach((pwdusr) => {
      passwords.push(...pwdusr.passwords.map((password) => ({
        id: password.id,
        key: pwdusr.key, login:
        password.login,
        description: password.description,
        webAddress: password.webAddress,
        password: password.password,
        shareId: pwdusr.id,
      })));
    })
    return { passwords };
  }

  async getSharingPasswords(user: UserCredentials) {
    const passwords: Array<SharedPasswordsDTO> = [];
    const passwordUsers = await db.User.findByPk(user.id, {
      include: [
        { model: db.PasswordUsers as any,
          as: 'passwordUsersOwner' ,
          include: 
            [
              { model: db.Password as any,
                where: {
                  removed: false
                }
              },
              { model: db.User as any,
                as: 'user',
              }
            ]
          }
      ]
    });
    passwordUsers.passwordUsersOwner.map((pwdUsr) => {
      passwords.push(...pwdUsr.passwords.map((password) => ({
        id: password.id,
        key: pwdUsr.key,
        login: password.login,
        description: password.description,
        webAddress: password.webAddress,
        password: password.password,
        user: pwdUsr.user.login,
        shareId: pwdUsr.id
      })))
    })
    return { passwords };
  }

  async removeSharing(user: UserCredentials, payload: { sharingId: number, owner: boolean }) {
    if (payload.owner) {
      const passwordUsers = await db.User.findByPk(user.id, {
        include: [
          {
            model: db.PasswordUsers as any,
            as: 'passwordUsersOwner',
            where: {
              id: payload.sharingId
            }
          }
        ]
      });
      await Promise.all([passwordUsers.passwordUsersOwner.map(async (pwdUsr) => await pwdUsr.destroy())]);
    } else {
      const passwordUsers = await db.User.findByPk(user.id, {
      include: [
        {
          model: db.PasswordUsers as any,
          as: 'passwordUsers',
          where: {
            id: payload.sharingId
          }
        }
      ]
    });
    await Promise.all([passwordUsers.passwordUsers.map(async (pwdUsr) => await pwdUsr.destroy())]);
    }
    return {};
  }

  async createPassword(user: UserCredentials, password: CreatePasswordDTO) {
    const createdPassword = await db.Password.create({
      userId: user.id,
      ...password,
      removed: false,
      password: encodePassword(password.password, password.key),
    }).catch((error) => {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    });
    await db.DataChange.create({
      actionType: 'CREATE',
      passwordId: createdPassword.id,
      userId: user.id,
      fields: ['login', 'description', 'webAddress', 'password'],
      currentValues: [password.login, password.description, password.webAddress, password.password],
      previousValues: [password.login, password.description, password.webAddress, password.password],
    });
    return createdPassword;
  }

  async deletePassword(user: UserCredentials, id: number) {
    const password = await db.Password.findByPk(id);
    await password.update({
      removed: true
    }, {
      where: {
        userId: user.id,
      }
    }).catch(() => {
      throw new InternalServerErrorException();
    });
    await db.DataChange.create({
      actionType: 'DELETE',
      passwordId: id,
      userId: user.id,
      fields: ['login', 'description', 'webAddress', 'password'],
      currentValues: [password.login, password.description, password.webAddress, password.password],
      previousValues: [password.login, password.description, password.webAddress, password.password],
    });
  }

  async sharePassword(user: UserCredentials, sharePassword: SharePasswordDTO) {
    const sharedUser = await db.User.findOne({
      where: {
        login: sharePassword.email
      }
    });
    if (sharedUser) {
      return await db.PasswordUsers.create({
        ownerId: user.id,
        passwordId: sharePassword.passwordId,
        userId: sharedUser.id,
        key: sharePassword.key,
      });
    }
    throw new NotFoundException();
  }

  async editPassword(
    user: UserCredentials,
    newPassword: Partial<EditPasswordDTO>,
  ): Promise<Password> {
    const dbUser = await db.User.findByPk(user.id);
    if (await dbUser.hasPassword(newPassword.id)) {
      const { id, password, ...rest } = newPassword;
      const oldPassword = await db.Password.findByPk(id);
      await db.DataChange.create({
        actionType: 'UPDATE',
        userId: user.id,
        passwordId: id,
        fields: ['login', 'description', 'webAddress', 'password'],
        currentValues: [ newPassword.login, newPassword.description, newPassword.webAddress, password ? encodePassword(password, newPassword.key) : oldPassword.password],
        previousValues: [ oldPassword.login, oldPassword.description, oldPassword.webAddress, oldPassword.password ],
      });
      return await oldPassword.update(
        {
          ...rest,
          password: password ? encodePassword(password, newPassword.key) : oldPassword.password,
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
