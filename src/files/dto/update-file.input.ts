import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { UploadFileInput } from './upload-file.input';

@InputType()
export class UpdateFileInput extends PartialType(UploadFileInput) {
  @Field(() => Int)
  id: number;
}
