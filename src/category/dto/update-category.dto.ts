import { CreateCategoryDto } from './create-category.dto';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @Field(() => Int)
  id: number;
}
