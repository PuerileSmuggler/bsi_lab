import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PasswordModule } from './password/password.module';
import { UsersModule } from './user/users.module';

@Module({
  imports: [AuthModule, UsersModule, PasswordModule],
})
export class AppModule {}
