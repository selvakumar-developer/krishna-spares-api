import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { FilesService } from 'src/files/files.service';
import { SupabaseBucketFolder } from 'src/interface/supabase-bucket';
import { hash } from 'src/utils';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly fileService: FilesService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    try {
      const passwordHash = hash(createUserInput.password);
      const fileUploadResponse = await this.fileService.uploadFile(
        createUserInput.profilePicture,
        SupabaseBucketFolder.USER_PROFILE_PICTURE,
      );

      const createUserResponse = await this.userModel.create({
        ...createUserInput,
        passwordHash,
        profilePicture: fileUploadResponse._id,
      });
      return createUserResponse;
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async findAll() {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async countUsers() {
    try {
      return await this.userModel.countDocuments().exec();
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async findAllWithPagination(page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;

      const [users, total] = await Promise.all([
        this.userModel.find().skip(skip).limit(limit).exec(),
        this.countUsers(),
      ]);
      const totalPages = Math.ceil(total / limit);

      return {
        data: users,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: total,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel
        .findById(id)
        .select('-passwordHash')
        .exec();
      if (!user) {
        throw new NotFoundException(`User with ID "${id}" not found`);
      }
      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async findBy(filter: FilterQuery<User>) {
    try {
      const user = await this.userModel.findOne({ ...filter }).exec();
      if (!user) {
        throw new NotFoundException(`User not found`);
      }
      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, updateUserInput, { new: true })
        .select('-password')
        .exec();
      if (!updatedUser) {
        throw new NotFoundException(`User with ID "${id}" not found`);
      }
      return updatedUser;
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException(`User with ID "${id}" not found`);
      }
      const deletedUser = await user.deleteOne();
      if (deletedUser.deletedCount > 0) {
        return user;
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }
}
