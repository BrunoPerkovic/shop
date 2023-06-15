import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entity/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  async createCategory(
    @Args('createCategoryDto') createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Query(() => [Category], { name: 'categories' })
  async getAllCategories(): Promise<Category[]> {
    return await this.categoryService.getAllCategories();
  }

  @Query(() => Category, { name: 'category' })
  async getCategory(@Args('id') id: number): Promise<Category> {
    return await this.categoryService.getCategoryById(id);
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args('id') id: number,
    @Args('updateCategoryDto') updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.categoryService.deleteCategory(id);
    return true;
  }
}
