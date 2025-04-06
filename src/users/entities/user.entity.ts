import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { File } from 'src/files/entities/file.entity';
import Address from './address.entity';

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

  @Field(() => File, { description: 'Profile picture ID of the user' })
  @Prop({ type: Types.ObjectId, ref: File.name })
  profilePicture: Types.ObjectId;

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
