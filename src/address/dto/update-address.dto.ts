import { createAddressDto } from './create-address.dto';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAddressDto extends PartialType(createAddressDto) {}
