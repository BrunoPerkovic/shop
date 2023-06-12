import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Category } from 'src/category/entity/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  exports: [ProductService],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
