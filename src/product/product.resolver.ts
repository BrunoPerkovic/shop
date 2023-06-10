import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('input') createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.createProduct(createProductDto);
  }

  @Query(() => [Product], { name: 'products' })
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  }

  @Query(() => Product, { name: 'product' })
  async getProductById(@Args('id') id: string): Promise<Product> {
    return await this.productService.getProductById(Number(id));
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id') id: string,
    @Args('input') updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productService.updateProduct(
      Number(id),
      updateProductDto,
    );
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('id') id: string): Promise<void> {
    return await this.productService.deleteProduct(Number(id));
  }
}
