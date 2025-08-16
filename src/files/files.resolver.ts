import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { Types } from 'mongoose';
import { SupabaseBucketFolder } from 'src/interface/supabase-bucket';
import { File } from './dto/file.dto';
import { UpdateFileInput } from './dto/update-file.input';
import { FilesService } from './files.service';

@Resolver(() => File)
export class FilesResolver {
  constructor(private readonly filesService: FilesService) { }

  @Mutation(() => File)
  async uploadFile(
    @Args({ name: 'uploadFile', type: () => GraphQLUpload })
    file: FileUpload,
  ): Promise<File> {
    return this.filesService.uploadFile(file, SupabaseBucketFolder.USER_PROFILE_PICTURE);
  }

  @Query(() => [File], { name: 'files' })
  findAll() {
    return this.filesService.findAll();
  }

  @Query(() => File, { name: 'file' })
  findOne(@Args('id', { type: () => String }) id: Types.ObjectId) {
    return this.filesService.findOne(id);
  }

  @Mutation(() => File)
  updateFile(@Args('updateFileInput') updateFileInput: UpdateFileInput) {
    return this.filesService.update(updateFileInput.id, updateFileInput);
  }

  @Mutation(() => File)
  removeFile(@Args('id', { type: () => Int }) id: number) {
    return this.filesService.remove(id);
  }
}
