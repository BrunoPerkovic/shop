import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/auth.roles';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Roles(Role.Admin)
  @Mutation(() => Product)
  async createProduct(
    @Args('createProductDto') createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.createProduct(createProductDto);
  }

  @Roles(Role.Admin)
  @Query(() => [Product], { name: 'products' })
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  }

  @Roles(Role.Admin)
  @Query(() => Product, { name: 'product' })
  async getProductById(@Args('id') id: number): Promise<Product> {
    return await this.productService.getProductById(id);
  }

  @Roles(Role.Admin)
  @Mutation(() => Product)
  async updateProduct(
    @Args('id') id: number,
    @Args('updateProductDto') updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productService.updateProduct(id, updateProductDto);
  }

  @Roles(Role.Admin)
  @Mutation(() => Boolean)
  async deleteProduct(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.productService.deleteProduct(id);
    return true;
  }
}
