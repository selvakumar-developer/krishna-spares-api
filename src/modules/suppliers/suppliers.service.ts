import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { UpdateSupplierInput } from './dto/update-supplier.input';
import { Supplier, SupplierDocument } from './entities/supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectModel(Supplier.name) private supplierModel: Model<SupplierDocument>,
  ) {}

  async create(createSupplierInput: CreateSupplierInput) {
    try {
      const createdSupplier =
        await this.supplierModel.create(createSupplierInput);
      return createdSupplier;
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async findAll() {
    try {
      return await this.supplierModel.find().exec();
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async findOne(id: string) {
    try {
      const supplier = await this.supplierModel.findById(id).exec();
      if (!supplier) {
        throw new NotFoundException(`Supplier with ID "${id}" not found`);
      }
      return supplier;
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async update(id: string, updateSupplierInput: UpdateSupplierInput) {
    try {
      const updatedSupplier = await this.supplierModel
        .findByIdAndUpdate(id, updateSupplierInput, { new: true })
        .exec();
      if (!updatedSupplier) {
        throw new NotFoundException(`Supplier with ID "${id}" not found`);
      }
      return updatedSupplier;
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async remove(id: string) {
    try {
      const supplier = await this.supplierModel.findById(id).exec();
      if (!supplier) {
        throw new NotFoundException(`Supplier with ID "${id}" not found`);
      }
      const deletedSupplier = await supplier.deleteOne();
      if (deletedSupplier.deletedCount > 0) {
        return supplier;
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async countSuppliers() {
    try {
      return await this.supplierModel.countDocuments().exec();
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async findAllWithPagination(page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;

      const [suppliers, total] = await Promise.all([
        this.supplierModel.find().skip(skip).limit(limit).exec(),
        this.countSuppliers(),
      ]);
      const totalPages = Math.ceil(total / limit);

      return {
        data: suppliers,
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
}
