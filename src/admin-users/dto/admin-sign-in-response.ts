import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AdminSignInResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
