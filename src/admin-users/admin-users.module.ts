import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminUsersResolver } from './admin-users.resolver';
import { AdminUsersService } from './admin-users.service';
import { AdminUser, AdminUserSchema } from './entities/admin-user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminUser.name, schema: AdminUserSchema },
    ]),
  ],
  providers: [AdminUsersResolver, AdminUsersService],
})
export class AdminUsersModule {}
