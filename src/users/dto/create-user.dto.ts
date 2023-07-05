import { InputType, Field } from '@nestjs/graphql';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { Address } from 'src/address/entity/address.entity';

@InputType()
export class CreateUserDto {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  userName: string;

  @Field()
  password: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  deleted: boolean;

  @Field(() => CreateAddressDto)
  address: Address;
}
