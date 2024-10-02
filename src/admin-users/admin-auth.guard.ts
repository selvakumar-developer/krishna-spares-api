import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IAppConfig } from 'src/interface/config';
import { AdminUsersService } from './admin-users.service';
import { AdminUser } from './entities/admin-user.entity';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService<IAppConfig>,
    private adminUsersService: AdminUsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: AdminUser = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<IAppConfig['JWT_SECRET']>('JWT_SECRET'),
      });
      const user = await this.adminUsersService.findBy({
        email: payload.email,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['adminUser'] = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private getRequest(context: ExecutionContext): Request {
    if (context.getType() === 'http') {
      // HTTP request (REST)
      return context.switchToHttp().getRequest();
    } else {
      // GraphQL request
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req;
    }
  }
}
