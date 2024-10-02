import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminUsersModule } from 'src/admin-users/admin-users.module';
import { User, UserSchema } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule,
    AdminUsersModule,
  ],

  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
