import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entity/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = new Category();

    category.categoryName = createCategoryDto.name;

    return await this.categoryRepository.save(category);
  }

  async getCategoryById(id: string): Promise<Category> {
    return await this.categoryRepository.findOneByOrFail({
      id: Number(id),
    });
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }
}
