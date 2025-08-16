import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/sign-in-input';
import { SignInResponse } from './dto/sign-in-response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignInResponse)
  signIn(@Args('signIn') signInInput: SignInInput) {
    return this.authService.signIn(signInInput);
  }
}
