import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAddressInput {
  @Field({ description: 'Street Name for the address' })
  street: string;

  @Field({ description: 'City name for the address' })
  city: string;

  @Field({ description: 'State name for the address' })
  state: string;

  @Field({ description: 'Postal code for the address' })
  postalCode: string;

  @Field({ description: 'Country name for the address' })
  country: string;
}
