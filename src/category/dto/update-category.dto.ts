import { CreateCategoryDto } from './create-category.dto';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
