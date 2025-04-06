import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from './entities/file.entity';
import { FilesResolver } from './files.resolver';
import { FilesService } from './files.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: File.name, schema: FileSchema }
    ]),
  ], providers: [FilesResolver, FilesService],
})
export class FilesModule { }
