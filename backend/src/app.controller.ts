import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { CreatePasswordDTO, RegisterUserDTO } from './dto/User';
import { UsersService } from './user/users.service';

@Controller('')
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly appService: AppService,
    private readonly usersService: UsersService,
  ) {}

  @Post('auth/register')
  async registerUser(@Body() user: RegisterUserDTO) {
    await this.appService.createUser(user);
    return {};
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('password/create')
  async createPassword(@Req() req, @Body() body: CreatePasswordDTO) {
    this.appService.createPassword(req.user, body);
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Get('password')
  async getPasswords(@Req() req) {
    return this.usersService.getPasswords(req.user);
  }
}
