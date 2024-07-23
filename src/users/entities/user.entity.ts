import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address } from 'src/address/entities/address.entity';

@ObjectType()
@Schema()
export class User {
  @Field(() => ID, { description: 'Unique identifier of the user' })
  @Prop()
  _id: string;

  @Field({ description: 'Name of the user' })
  @Prop()
  userName: string;

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

  @Field(() => Address, { description: 'Address of the user' })
  @Prop()
  address: string;

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
