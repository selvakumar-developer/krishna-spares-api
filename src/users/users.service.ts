import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserInput: CreateUserInput) {
    try {
      const passwordHash = await bcrypt.hash(createUserInput.passwordHash, 10);

      const createUserResponse = await this.userModel.create({
        ...createUserInput,
        passwordHash,
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

  async findOne(id: number) {
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
