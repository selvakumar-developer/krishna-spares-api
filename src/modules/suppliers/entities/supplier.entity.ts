import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Supplier {
  @Field(() => String, { description: 'MongoDB generated ID' })
  _id: Types.ObjectId;

  @Field({ description: 'Name of the supplier' })
  @Prop()
  fullName: string;

  @Field({ description: 'Mobile Number of the supplier' })
  @Prop()
  mobileNumber: string;
}

export type SupplierDocument = Supplier & Document;
export const SupplierSchema = SchemaFactory.createForClass(Supplier);
