import { CreateAdminUserInput } from './create-admin-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAdminUserInput extends PartialType(CreateAdminUserInput) {
  @Field()
  id: string;
}
