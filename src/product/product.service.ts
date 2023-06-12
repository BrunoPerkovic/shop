import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from 'src/category/entity/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const queryBuilder = this.categoryRepository.createQueryBuilder('category');
    const categories = await queryBuilder
      .where('category.id IN (:...categoryIds)', {
        categoryIds: createProductDto.categories,
      })
      .getMany();

    const product = this.productRepository.create({
      name: createProductDto.name,
      price: createProductDto.price,
      size: createProductDto.size,
      description: createProductDto.description,
      categories: categories,
    });

    return this.productRepository.save(product);
  }

  async getProductById(id: number): Promise<Product> {
    return this.productRepository.findOneByOrFail({
      id: Number(id),
    });
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.getProductById(id);

    if (!product) {
      throw new Error(`There is no product with id:${id}`);
    }

    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
