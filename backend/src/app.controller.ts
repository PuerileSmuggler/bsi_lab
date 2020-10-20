import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './database/models/User';
import { RegisterUserDTO } from './dto/User';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('register')
  async registerUser(@Body() user: RegisterUserDTO): Promise<User> {
    console.log(user);
    return await this.appService.createUser(user);
  }
}
