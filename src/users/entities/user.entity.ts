import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID, { description: 'Unique identifier of the user' })
  _id: string;

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

  @Field({ description: 'Created Date of the user' })
  createdAt: Date;

  @Field({ description: 'Updated Date of the user' })
  updatedAt: Date;

  @Field({
    description: 'To maintain whether the user is deleted or not (soft delete)',
  })
  isDeleted: boolean;
}
