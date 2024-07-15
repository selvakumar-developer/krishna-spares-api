import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID, { description: 'Unique identifier of the user' })
  _id: string;

  @Field({ description: 'Name of the user' })
  name: string;
}
