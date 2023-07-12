import { InputType, Field } from '@nestjs/graphql';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { Role } from 'src/auth/roles/auth.roles';

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

  @Field(() => Role)
  role: Role;

  @Field()
  deleted: boolean;

  @Field(() => CreateAddressDto)
  address: CreateAddressDto;
}
