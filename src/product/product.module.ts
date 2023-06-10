import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';

@Module({
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
  imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductModule {}
