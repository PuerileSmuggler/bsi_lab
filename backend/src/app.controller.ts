import {
  Bind,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { RegisterUserDTO } from './dto/User';

@Controller('auth')
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @Post('register')
  async registerUser(@Body() user: RegisterUserDTO) {
    await this.appService.createUser(user);
    return {};
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Bind(Request())
  async login(req) {
    return this.authService.login(req.user);
  }
}
