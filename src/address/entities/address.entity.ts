import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class Address {
  @Field(() => ID, { description: 'Unique identifier for the address' })
  @Prop()
  _id: string;

  @Field({ description: 'Street Name for the address' })
  @Prop()
  street: string;

  @Field({ description: 'City name for the address' })
  @Prop()
  city: string;

  @Field({ description: 'State name for the address' })
  @Prop()
  state: string;

  @Field({ description: 'Postal code for the address' })
  @Prop()
  postalCode: string;

  @Field({ description: 'Country name for the address' })
  @Prop()
  country: string;

  @Field({ description: 'Created date for the address' })
  @Prop()
  createdAt: Date;

  @Field({ description: 'Updated date for the address' })
  @Prop()
  updatedAt: Date;

  @Field({
    description:
      'To maintain whether the address is deleted or not (soft delete)',
  })
  @Prop()
  isDeleted: boolean;
}

export type AddressDocument = Address & Document;
export const AddressSchema = SchemaFactory.createForClass(Address);
