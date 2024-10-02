import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AdminSignInResponse {
  @Field()
  access_token: string;
}
