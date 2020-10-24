import { Injectable } from '@nestjs/common';
import db from 'src/database/initializeDatabase';

export type User = any;

@Injectable()
export class UsersService {
  async findOne(login: string) {
    return await db.User.findOne({
      where: {
        login,
      },
    });
  }
}
