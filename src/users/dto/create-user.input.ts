import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ description: 'Name of the user' })
  userName: string;

  @Field({ description: 'Email of the user' })
  email: string;

  @Field({ description: 'Encrypted password of the user' })
  passwordHash: string;

  @Field({ description: 'Mobile Number of the user' })
  mobileNumber: string;

  @Field({ description: 'Profile picture URL of the user' })
  profilePictureUrl: string;

  @Field({ description: 'Address of the user' })
  address: string;
}
