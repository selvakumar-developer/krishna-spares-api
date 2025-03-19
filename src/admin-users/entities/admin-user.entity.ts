import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { hash } from 'src/utils';

export enum ROLE {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(ROLE, {
  name: 'ROLE',
});

@ObjectType()
@Schema({ timestamps: true, collection: 'admin-users' })
export class AdminUser {
  @Field({ description: 'Username of the administrator' })
  @Prop()
  username: string;

  @Field({ description: 'email of the administrator' })
  @Prop({ unique: true })
  email: string;

  @Field({ description: 'password of the administrator', nullable: true })
  @Prop()
  password: string;

  @Field(() => Boolean, {
    defaultValue: true,
    description: 'User active status',
  })
  @Prop()
  isActive: boolean;

  @Field(() => ROLE, { description: 'User role', defaultValue: ROLE.ADMIN })
  @Prop({ type: String, enum: ROLE, default: ROLE.ADMIN })
  role: ROLE;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

export type AdminUserDocument = AdminUser & Document;
export const AdminUserSchema = SchemaFactory.createForClass(AdminUser);

AdminUserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = hash(this.password);
  }
  next();
});
