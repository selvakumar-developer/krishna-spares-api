import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

// GraphQL Input Type for pagination arguments
@InputType()
export class PaginationArgs {
  @Field(() => Int, {
    defaultValue: 1,
    description: 'Page number (starts from 1)',
  })
  page: number = 1;

  @Field(() => Int, {
    defaultValue: 10,
    description: 'Number of items per page',
  })
  limit: number = 10;
}

// GraphQL Object Type for pagination metadata
@ObjectType()
export class PaginationInfo {
  @Field(() => Int, { description: 'Current page number' })
  currentPage: number;

  @Field(() => Int, { description: 'Total number of pages' })
  totalPages: number;

  @Field(() => Int, { description: 'Total number of items' })
  totalItems: number;

  @Field(() => Int, { description: 'Number of items per page' })
  itemsPerPage: number;

  @Field({ description: 'Whether there is a next page' })
  hasNextPage: boolean;

  @Field({ description: 'Whether there is a previous page' })
  hasPreviousPage: boolean;
}
