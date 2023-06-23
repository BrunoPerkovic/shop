import { CreateProductDto } from './create-product.dto';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductDto extends PartialType(CreateProductDto) {
  @Field(() => Int)
  id: number;
}
