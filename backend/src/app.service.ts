import { Injectable } from '@nestjs/common';
import db from './database/initializeDatabase';
import { User } from './database/models/User';
import { RegisterUserDTO } from './dto/User';

@Injectable()
export class AppService {
  async createUser(user: RegisterUserDTO): Promise<User> {
    console.log(user);
    return await db.User.create({
      ...user,
      salt: 'test',
      isPasswordKeptAsHash: true,
    });
  }
}
