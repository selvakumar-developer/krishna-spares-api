import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  Length,
  ValidateNested,
} from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
@InputType()
export class CreateUserInput {
  @Field({ description: 'Name of the user' })
  @IsNotEmpty({ message: 'Username is required' })
  fullName: string;

  @Field({ description: 'Email of the user' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Field({ description: 'Encrypted password of the user' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @Field({ description: 'Mobile Number of the user' })
  @IsNotEmpty({ message: 'Mobile Number is required' })
  @IsMobilePhone('en-IN', {}, { message: 'Invalid Mobile Number' })
  mobileNumber: string;

  @Field(() => GraphQLUpload, { description: 'Profile picture URL of the user', nullable: true })
  profilePicture?: FileUpload;

  @Field(() => [CreateAddressInput], { description: 'Addresses of the user' })
  @IsArray({ message: 'Addresses must be an array' })
  @ArrayMinSize(1, { message: 'At least one address is required' })
  @ValidateNested()
  @Type(() => CreateAddressInput)
  address: [CreateAddressInput];
}
@InputType()
export class CreateAddressInput {
  @Field({ description: 'Street Name for the address' })
  @IsNotEmpty({ message: 'Street Name is required' })
  street: string;

  @Field({ description: 'City name for the address' })
  @IsNotEmpty({ message: 'City is required' })
  city: string;

  @Field({ description: 'State name for the address' })
  @IsNotEmpty({ message: 'State is required' })
  state: string;

  @Field({ description: 'Postal code for the address' })
  @IsNotEmpty({ message: 'Postal code is required' })
  @Length(6, 6, { message: 'Invalid postal code' })
  postalCode: string;

  @Field({ description: 'Country name is required' })
  @IsNotEmpty({ message: 'Country is required' })
  country: string;
}
