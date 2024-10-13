import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { IAppConfig } from 'src/interface/config';
import { AdminUsersResolver } from './admin-users.resolver';
import { AdminUsersService } from './admin-users.service';
import { AdminUser, AdminUserSchema } from './entities/admin-user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminUser.name, schema: AdminUserSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<IAppConfig>) => ({
        global: true,
        secret: configService.get('ADMIN_ACCESS_TOKEN_JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('ADMIN_USER_ACCESS_TOKEN_EXP_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AdminUsersResolver, AdminUsersService],
  exports: [AdminUsersService],
})
export class AdminUsersModule {}
