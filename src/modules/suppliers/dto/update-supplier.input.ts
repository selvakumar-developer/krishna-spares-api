import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { CreateSupplierInput } from './create-supplier.input';

@InputType()
export class UpdateSupplierInput extends PartialType(CreateSupplierInput) {
  @Field()
  @IsMongoId({ message: 'Invalid Id' })
  id: string;
}
