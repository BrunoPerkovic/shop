import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductDto {
  @Field()
  name: string;

  @Field(() => [Int])
  categories: number[];

  @Field(() => Float)
  price: number;

  @Field()
  size: string;

  @Field()
  description: string;
}
