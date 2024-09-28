import { InputType, Int, Field } from '@nestjs/graphql';
import { ROLE } from '../entities/admin-user.entity';

@InputType()
export class CreateAdminUserInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => ROLE, { defaultValue: ROLE.USER }) // Default role is USER
  role: ROLE;

  @Field(() => Boolean, { defaultValue: true })
  isActive: boolean;
}
