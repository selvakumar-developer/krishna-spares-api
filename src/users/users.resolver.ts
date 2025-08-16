import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AdminAuthGuard } from 'src/admin-users/admin-auth.guard';
import { PaginationArgs } from 'src/common/dto/pagination.dto';
import { File } from 'src/files/entities/file.entity';
import { FilesService } from 'src/files/files.service';
import { CreateUserInput } from './dto/create-user.input';
import { PaginatedUsersResponse } from './dto/paginated-user-response';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
@UseGuards(AdminAuthGuard)
@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly fileService: FilesService,
  ) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => PaginatedUsersResponse, { name: 'usersPaginated' })
  async findAllWithPagination(
    @Args('paginationArgs', { type: () => PaginationArgs, nullable: true })
    paginationArgs: PaginationArgs = { page: 1, limit: 10 },
  ): Promise<PaginatedUsersResponse> {
    return this.usersService.findAllWithPagination(
      paginationArgs.page,
      paginationArgs.limit,
    );
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id') id: string) {
    return this.usersService.remove(id);
  }

  @ResolveField(() => File, { nullable: true })
  async profilePicture(@Parent() user: User) {
    return this.fileService.findOne(user.profilePicture);
  }
}
