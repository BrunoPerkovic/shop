import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderDto {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
