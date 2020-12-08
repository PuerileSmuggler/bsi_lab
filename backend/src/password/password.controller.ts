import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  CreatePasswordDTO,
  EditPasswordDTO,
  PaginationDTO,
} from 'src/dto/User';
import { PasswordService } from './password.service';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createPassword(@Req() req, @Body() body: CreatePasswordDTO) {
    return await this.passwordService.createPassword(req.user, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('edit')
  async editPassword(@Req() req, @Body() body: Partial<EditPasswordDTO>) {
    return await this.passwordService.editPassword(req.user, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getPassword(@Req() req, @Param() params) {
    return await this.passwordService.findOne(req.user, params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('')
  async deletePassword(@Body() body: { id: number }) {
    await this.passwordService.deletePassword(Number(body.id));
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async getPasswords(@Req() req, @Body() body: PaginationDTO) {
    return this.passwordService.getPasswords(req.user, body);
  }
}
