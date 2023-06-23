import { CreateAddressDto } from './create-address.dto';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAddressDto extends PartialType(CreateAddressDto) {
  @Field(() => Int)
  id: number;
}
