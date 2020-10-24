import { Injectable } from '@nestjs/common';
import db from 'src/database/initializeDatabase';
import { UserCredentials } from 'src/dto/User';

@Injectable()
export class UsersService {
  async findOne(login: string) {
    return await db.User.findOne({
      where: {
        login,
      },
    });
  }

  async getPasswords(user: UserCredentials) {
    return await (
      await db.User.findOne({
        where: {
          id: user.id,
        },
      })
    ).getPasswords();
  }
}
