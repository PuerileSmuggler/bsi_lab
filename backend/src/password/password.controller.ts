import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SharePasswordDTO } from 'src/dto/Password';
import {
  CreatePasswordDTO,
  EditPasswordDTO,
  PaginationDTO
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

  @UseGuards(JwtAuthGuard)
  @Post('shared')
  async getSharedPasswords(@Req() req) {
    return this.passwordService.getSharedPasswords(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('sharing')
  async getSharingPasswords(@Req() req) {
    return this.passwordService.getSharingPasswords(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('share')
  async sharePassword(@Req() req, @Body() body: SharePasswordDTO) {
    return this.passwordService.sharePassword(req.user, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('share')
  async removeSharing(@Req() req, @Body() body: { sharingId: number, owner: boolean }) {
    return this.passwordService.removeSharing(req.user, body);
  }
}
