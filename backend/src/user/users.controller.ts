import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RegisterUserDTO } from 'src/dto/User';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async registerUser(@Body() user: RegisterUserDTO) {
    return await this.usersService.createUser(user);
  }

  @Post('login')
  async login(
    @Body() user: { login: string; password: string },
    @Req() request,
  ) {
    return this.authService.login(user.login, user.password, request);
  }

  @Get('clear')
  async clearIpBlock(@Req() request) {
    return this.authService.clearIpBlock(request);
  }

  @UseGuards(JwtAuthGuard)
  @Post('edit')
  async edit(
    @Req() req,
    @Body()
    body: {
      oldPassword: string;
      password: string;
      key: string;
      encryption: 'hmac' | 'sha512';
    },
  ) {
    return await this.usersService.editUser(req.user, body);
  }
}
