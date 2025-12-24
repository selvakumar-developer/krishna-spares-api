import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/dto/pagination.dto';
import { AdminAuthGuard } from '../admin-users/admin-auth.guard';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { PaginatedSuppliersResponse } from './dto/paginated-supplier-response';
import { UpdateSupplierInput } from './dto/update-supplier.input';
import { Supplier } from './entities/supplier.entity';
import { SuppliersService } from './suppliers.service';

@UseGuards(AdminAuthGuard)
@Resolver(() => Supplier)
export class SuppliersResolver {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Mutation(() => Supplier)
  createSupplier(
    @Args('createSupplierInput') createSupplierInput: CreateSupplierInput,
  ) {
    return this.suppliersService.create(createSupplierInput);
  }

  @Query(() => [Supplier], { name: 'suppliers' })
  findAll() {
    return this.suppliersService.findAll();
  }

  @Query(() => PaginatedSuppliersResponse, { name: 'suppliersPaginated' })
  async findAllWithPagination(
    @Args('paginationArgs', { type: () => PaginationArgs, nullable: true })
    paginationArgs: PaginationArgs = { page: 1, limit: 10 },
  ): Promise<PaginatedSuppliersResponse> {
    return this.suppliersService.findAllWithPagination(
      paginationArgs.page,
      paginationArgs.limit,
    );
  }

  @Query(() => Supplier, { name: 'supplier' })
  findOne(@Args('id') id: string) {
    return this.suppliersService.findOne(id);
  }

  @Mutation(() => Supplier)
  updateSupplier(
    @Args('updateSupplierInput') updateSupplierInput: UpdateSupplierInput,
  ) {
    return this.suppliersService.update(
      updateSupplierInput.id,
      updateSupplierInput,
    );
  }

  @Mutation(() => Supplier)
  removeSupplier(@Args('id') id: string) {
    return this.suppliersService.remove(id);
  }
}
