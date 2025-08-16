import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  @IsMongoId({ message: 'Invalid Id' })
  id: string;
}
