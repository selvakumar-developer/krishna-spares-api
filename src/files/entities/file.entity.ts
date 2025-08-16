import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@ObjectType('FileEntity')
@Schema({ timestamps: true })
export class File {

  @Field(() => ID)
  _id: Types.ObjectId; // Mongoose ObjectId, exposed as ID in GraphQL

  @Field({ description: 'Name of the file' })
  @Prop()
  filename: string;

  @Field({ description: 'Original name of the file' })
  @Prop()
  originalName: string;

  @Field({ description: 'MIME type of the file' })
  @Prop()
  mimeType: string;

  @Field({ description: 'Size of the file in bytes' })
  @Prop()
  size: number;

  @Field({ description: 'URL of the file' })
  @Prop()
  url: string;

  @Field(() => Date)
  @Prop()
  createdAt: Date;

  @Field(() => Date)
  @Prop()
  updatedAt: Date;
}

export type FileDocument = File & Document;
export const FileSchema = SchemaFactory.createForClass(File);
