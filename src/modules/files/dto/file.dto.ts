import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class File {

    @Field()
    filename: string;

    @Field()
    originalName: string;

    @Field()
    mimeType: string;

    @Field()
    size: number;

    @Field()
    url: string;

    @Field()
    createdAt?: Date;
}