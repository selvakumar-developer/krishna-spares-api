import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { CreateAddressInput } from 'src/address/dto/create-address.input';

@InputType()
export class CreateUserInput {
  @Field({ description: 'Name of the user' })
  @IsNotEmpty({ message: 'Username is required' })
  userName: string;

  @Field({ description: 'Email of the user' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Field({ description: 'Encrypted password of the user' })
  @IsNotEmpty({ message: 'Password is required' })
  passwordHash: string;

  @Field({ description: 'Mobile Number of the user' })
  @IsNotEmpty({ message: 'Mobile Number is required' })
  @IsMobilePhone('en-IN', {}, { message: 'Invalid Mobile Number' })
  mobileNumber: string;

  @Field({ description: 'Profile picture URL of the user' })
  profilePictureUrl: string;

  @Field(() => CreateAddressInput, { description: 'Address of the user' })
  @IsNotEmpty({ message: 'Address is required' })
  @ValidateNested()
  @Type(() => CreateAddressInput)
  address: CreateAddressInput;
}
