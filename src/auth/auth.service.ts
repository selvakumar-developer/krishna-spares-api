import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SignInInput } from './dto/sign-in-input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInInput: SignInInput): Promise<{ access_token: string }> {
    const user = await this.usersService.findBy({ email: signInInput.email });

    const isPasswordValid = await bcrypt.compare(
      signInInput.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user._id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
