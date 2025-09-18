import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { FileUpload } from 'graphql-upload-ts';
import { Model, Types } from 'mongoose';
import { IAppConfig } from 'src/interface/config';
import { SupabaseBucketFolder } from 'src/interface/supabase-bucket';
import { UpdateFileInput } from './dto/update-file.input';
import { File, FileDocument } from './entities/file.entity';

@Injectable()
export class FilesService {
  private supabase: SupabaseClient;
  private bucketName: string;
  constructor(
    @InjectModel(File.name) private fileModel: Model<FileDocument>,
    private configService: ConfigService<IAppConfig>,
  ) {
    this.supabase = createClient(
      configService.get('SUPABASE_URL'),
      configService.get('SUPABASE_KEY'),
    );
    this.bucketName = configService.get('SUPABASE_BUCKET');
  }

  async uploadFile(
    file: FileUpload,
    folderName: SupabaseBucketFolder,
  ): Promise<File> {
    const { createReadStream, filename, mimetype } = await file;

    // Convert the file stream to a buffer
    const buffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      const stream = createReadStream();

      stream.on('data', (chunk: Uint8Array) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
    // Upload to Supabase Storage
    const uniqueFilename = `${Date.now()}_${filename}`;
    const { data, error } = await this.supabase.storage
      .from(this.bucketName) // Replace with your bucket name
      .upload(`${folderName}/${uniqueFilename}`, buffer, {
        contentType: mimetype,
      });

    if (error) {
      throw new Error(`Supabase upload failed: ${error.message}`);
    }

    // Get the public URL
    const { data: urlData } = this.supabase.storage
      .from(this.bucketName)
      .getPublicUrl(`${folderName}/${uniqueFilename}`);

    // Create a record in MongoDB
    const newFile = new this.fileModel({
      filename: uniqueFilename,
      originalName: filename,
      mimeType: mimetype,
      size: buffer.length,
      url: urlData.publicUrl,
    });

    return newFile.save();
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: Types.ObjectId) {
    return this.fileModel.findById(id);
  }

  update(id: number, updateFileInput: UpdateFileInput) {
    return `This action updates a #${id} file`;
  }

  async remove(id: Types.ObjectId) {
    // Find the file first to get the filename
    const file = await this.fileModel.findById(id);
    if (!file) {
      throw new Error('File not found');
    }

    // Extract folder name from the URL path
    const urlPath = new URL(file.url).pathname;
    // Decode the URL path to handle special characters properly
    const decodedPath = decodeURIComponent(urlPath);
    const pathWithoutBucket = decodedPath.split('/').slice(6).join('/');

    // Delete from Supabase
    const { error } = await this.supabase.storage.from(this.bucketName).remove([
      pathWithoutBucket, // Use the extracted path
    ]);

    if (error) {
      throw new Error(`Failed to delete file from storage: ${error.message}`);
    }

    // Delete from MongoDB
    await this.fileModel.findByIdAndDelete(id);

    return file;
  }
}
