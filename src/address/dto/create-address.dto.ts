import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class createAddressDto {
  @Field()
  street: string;

  @Field(() => Int)
  streetNumber: number;

  @Field()
  city: string;

  @Field()
  county: string;

  @Field(() => Int)
  countyNumber: number;

  @Field()
  country: string;

  @Field()
  postalCode: string;
}
