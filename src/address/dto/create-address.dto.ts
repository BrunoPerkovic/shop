import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateAddressDto {
  @Field()
  street: string;

  @Field(() => Int)
  streetNumber: number;

  @Field()
  city: string;

  @Field()
  county: string;

  @Field()
  country: string;

  @Field(() => Int)
  postalCode: number;
}
