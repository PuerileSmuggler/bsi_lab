import { Module } from '@nestjs/common';
import { PasswordModule } from 'src/password/password.module';
import { DataChangesController } from './data-changes.controller';
import { DataChangesService } from './data-changes.service';

@Module({
  imports: [PasswordModule],
  providers: [DataChangesService],
  controllers: [DataChangesController],
  exports: [DataChangesService],
})
export class DataChangesModule {}
