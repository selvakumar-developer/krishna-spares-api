import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../shared/shared.module';
import { Supplier, SupplierSchema } from './entities/supplier.entity';
import { SuppliersResolver } from './suppliers.resolver';
import { SuppliersService } from './suppliers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Supplier.name,
        schema: SupplierSchema,
      },
    ]),
    SharedModule,
  ],
  providers: [SuppliersResolver, SuppliersService],
})
export class SuppliersModule {}
