import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
@ObjectType()
class Address {
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

  @Field({
    description:
      'To maintain whether the address is deleted or not (soft delete)',
  })
  @Prop()
  isDeleted: boolean;
}
@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field({ description: 'Name of the user' })
  @Prop()
  fullName: string;

  @Field({ description: 'Email of the user' })
  @Prop()
  email: string;

  @Field({ description: 'Encrypted password of the user' })
  @Prop()
  passwordHash: string;

  @Field({ description: 'Mobile Number of the user' })
  @Prop()
  mobileNumber: string;

  @Field({ description: 'Profile picture URL of the user' })
  @Prop()
  profilePictureUrl: string;

  @Field(() => [Address], { description: 'List of addresses of the user' })
  @Prop({ type: [Address] })
  address: Types.ObjectId;

  @Field({ description: 'Created Date of the user' })
  @Prop()
  createdAt: Date;

  @Field({ description: 'Updated Date of the user' })
  @Prop()
  updatedAt: Date;

  @Field({
    description: 'To maintain whether the user is deleted or not (soft delete)',
  })
  @Prop()
  isDeleted: boolean;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
