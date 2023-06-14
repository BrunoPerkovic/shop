import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { Category } from 'src/category/entity/category.entity';

@InputType()
export class CreateProductDto {
  @Field()
  name: string;

  @Field(() => [Int])
  categories: Category[];

  @Field(() => Float)
  price: number;

  @Field()
  size: string;

  @Field()
  description: string;
}
