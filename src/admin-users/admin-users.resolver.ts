import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminUsersService } from './admin-users.service';
import { AdminSignInInput } from './dto/admin-sign-in-input';
import { AdminSignInResponse } from './dto/admin-sign-in-response';
import { CreateAdminUserInput } from './dto/create-admin-user.input';
import { UpdateAdminUserInput } from './dto/update-admin-user.input';
import { AdminUser } from './entities/admin-user.entity';

@Resolver(() => AdminUser)
export class AdminUsersResolver {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Mutation(() => AdminUser)
  createAdminUser(
    @Args('createAdminUserInput') createAdminUserInput: CreateAdminUserInput,
  ) {
    return this.adminUsersService.create(createAdminUserInput);
  }

  @Query(() => [AdminUser], { name: 'adminUsers' })
  findAll() {
    return this.adminUsersService.findAll();
  }

  @Query(() => AdminUser, { name: 'adminUser' })
  findOne(@Args('id') id: string) {
    return this.adminUsersService.get(id);
  }

  @Mutation(() => AdminUser)
  updateAdminUser(
    @Args('updateAdminUserInput') updateAdminUserInput: UpdateAdminUserInput,
  ) {
    return this.adminUsersService.update(
      updateAdminUserInput.id,
      updateAdminUserInput,
    );
  }

  @Mutation(() => AdminUser)
  removeAdminUser(@Args('id') id: string) {
    return this.adminUsersService.remove(id);
  }

  @Mutation(() => AdminSignInResponse)
  adminUserSignIn(@Args('adminUserSignIn') signInInput: AdminSignInInput) {
    return this.adminUsersService.signIn(signInInput);
  }
}
