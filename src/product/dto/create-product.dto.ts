import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductDto {
  @Field()
  name: string;

  @Field()
  category: string;

  @Field()
  price: number;

  @Field()
  size: string;

  @Field()
  description: string;
}
