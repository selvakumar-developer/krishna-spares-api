import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationInfo } from 'src/common/dto/pagination.dto';
import { User } from '../entities/user.entity';

// GraphQL Object Type for paginated users response
@ObjectType()
export class PaginatedUsersResponse {
  @Field(() => [User], { description: 'List of users' })
  data: User[];

  @Field(() => PaginationInfo, { description: 'Pagination information' })
  pagination: PaginationInfo;
}
