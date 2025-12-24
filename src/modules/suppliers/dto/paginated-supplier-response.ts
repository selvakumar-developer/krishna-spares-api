import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationInfo } from 'src/common/dto/pagination.dto';
import { Supplier } from '../entities/supplier.entity';

// GraphQL Object Type for paginated users response
@ObjectType()
export class PaginatedSuppliersResponse {
  @Field(() => [Supplier], { description: 'List of suppliers' })
  data: Supplier[];

  @Field(() => PaginationInfo, { description: 'Pagination information' })
  pagination: PaginationInfo;
}
