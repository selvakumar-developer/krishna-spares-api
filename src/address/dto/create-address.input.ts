import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

@InputType()
export class CreateAddressInput {
  @Field({ description: 'Street Name for the address' })
  @IsNotEmpty({ message: 'Street Name is required' })
  street: string;

  @Field({ description: 'City name for the address' })
  @IsNotEmpty({ message: 'City is required' })
  city: string;

  @Field({ description: 'State name for the address' })
  @IsNotEmpty({ message: 'State is required' })
  state: string;

  @Field({ description: 'Postal code for the address' })
  @IsNotEmpty({ message: 'Postal code is required' })
  @Length(6, 6, { message: 'Invalid postal code' })
  postalCode: string;

  @Field({ description: 'Country name is required' })
  @IsNotEmpty({ message: 'Country is required' })
  country: string;
}
