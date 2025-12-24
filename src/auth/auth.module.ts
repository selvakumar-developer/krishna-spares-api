import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { IAppConfig } from 'src/interface/config';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthResolver, AuthService],
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<IAppConfig>) => ({
        global: true,
        secret: configService.get('USER_ACCESS_TOKEN_JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('USER_ACCESS_TOKEN_EXP_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
