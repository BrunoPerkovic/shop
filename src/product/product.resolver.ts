import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductDto') createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.createProduct(createProductDto);
  }

  @Query(() => [Product], { name: 'products' })
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  }

  @Query(() => Product, { name: 'product' })
  async getProductById(@Args('id') id: number): Promise<Product> {
    return await this.productService.getProductById(id);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id') id: number,
    @Args('input') updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productService.updateProduct(id, updateProductDto);
  }

  @Mutation(() => Boolean)
  async deleteProduct(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.productService.deleteProduct(id);
    return true;
  }
}
