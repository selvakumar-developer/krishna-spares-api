import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from 'src/modules/files/files.module';
import { SharedModule } from '../shared/shared.module';
import { User, UserSchema } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    FilesModule,
    SharedModule,
  ],

  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
