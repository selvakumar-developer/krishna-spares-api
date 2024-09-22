import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';
import { Address } from 'src/address/entities/address.entity';

@ObjectType()
@Schema({ timestamps: true })
export class User {
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

  @Field(() => ID, { description: 'Address of the user' })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Address.name })
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

UserSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function () {
    const user = this as User;
    if (user.address) {
      await this.model(Address.name).deleteOne({ _id: user.address }).exec();
    }
  },
);
