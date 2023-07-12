import { InputType, Field, Int } from '@nestjs/graphql';
import { County } from '../enums/county.enum';
import { CountyCodesCroatia } from '../enums/county_codes.enum';

@InputType()
export class CreateAddressDto {
  @Field()
  street: string;

  @Field(() => Int)
  streetNumber: number;

  @Field()
  city: string;

  @Field(() => County, { nullable: false })
  county: County;

  @Field(() => CountyCodesCroatia, { nullable: false })
  countyCode: CountyCodesCroatia;

  @Field()
  country: string;

  @Field(() => Int)
  postalCode: number;
}
