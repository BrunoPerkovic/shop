import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  addressId: number;

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
}
