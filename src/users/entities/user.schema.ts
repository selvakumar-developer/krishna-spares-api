import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Address } from 'src/address/entities/address.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  userName: string;

  @Prop()
  email: string;

  @Prop()
  passwordHash: string;

  @Prop({ type: mongoose.Schema.ObjectId, ref: Address.name })
  address: Address;

  @Prop()
  mobileNumber: string;

  @Prop()
  profilePictureUrl: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
