import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Address {
  @Field(() => Int, { description: 'Unique identifier for the address' })
  _id: string;

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

  @Field({ description: 'Created date for the address' })
  createdAt: Date;

  @Field({ description: 'Updated date for the address' })
  updatedAt: Date;

  @Field({
    description:
      'To maintain whether the address is deleted or not (soft delete)',
  })
  isDeleted: boolean;
}
