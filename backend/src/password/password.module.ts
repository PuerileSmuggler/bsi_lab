import { Module } from '@nestjs/common';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';

@Module({
  providers: [PasswordService],
  controllers: [PasswordController],
  exports: [PasswordService],
})
export class PasswordModule {}
