import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('')
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('refreshToken')
  async login(@Req() req) {
    return this.authService.refreshToken(req.user);
  }
}
