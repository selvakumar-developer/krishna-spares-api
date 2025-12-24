import { Field, InputType } from '@nestjs/graphql';
import { IsMobilePhone, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateSupplierInput {
  @Field({ description: 'Name of the supplier' })
  @IsNotEmpty({ message: 'Supplier name is required' })
  fullName: string;

  @Field({ description: 'Mobile Number of the supplier' })
  @IsNotEmpty({ message: 'Mobile Number is required' })
  @IsMobilePhone('en-IN', {}, { message: 'Invalid Mobile Number' })
  mobileNumber: string;
}
