import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInResponse } from './dto/aign-in-response';
import { SignInInput } from './dto/sign-in-input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignInResponse)
  signIn(@Args('signIn') signInInput: SignInInput) {
    return this.authService.signIn(signInInput);
  }
}
