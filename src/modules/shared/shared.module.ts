import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminUsersModule } from '../admin-users/admin-users.module';

@Module({
  imports: [JwtModule, AdminUsersModule],
  exports: [JwtModule, AdminUsersModule],
})
export class SharedModule {}
