import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DataChangeDTO } from 'src/dto/DataChange';
import { DataChangesService } from './data-changes.service';

@Controller('dataChanges')
export class DataChangesController {
  constructor(private readonly dataChangesService: DataChangesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getDataChanges(@Req() req) {
    return await this.dataChangesService.getDataChanges(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async revertDataChange(@Req() req, @Body() body: DataChangeDTO) {
    return await this.dataChangesService.revertDataChange(req.user, body);
  }
}
