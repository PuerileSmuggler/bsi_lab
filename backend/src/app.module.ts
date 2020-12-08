import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PasswordModule } from './password/password.module';
import { UsersModule } from './user/users.module';

@Module({
  imports: [AuthModule, UsersModule, PasswordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
