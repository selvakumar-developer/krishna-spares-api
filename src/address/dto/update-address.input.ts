import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { CreateAddressInput } from './create-address.input';

@InputType()
export class UpdateAddressInput extends PartialType(CreateAddressInput) {
  @Field()
  @IsMongoId({ message: 'Invalid Id' })
  id: string;
}
