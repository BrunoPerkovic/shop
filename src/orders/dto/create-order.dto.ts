import {
  Field,
  InputType,
  GraphQLISODateTime,
  Float,
  Int,
  registerEnumType,
} from '@nestjs/graphql';
import { ShippingStatus } from '../enums/shipping-status.enum';
import { PaymentMethods } from '../enums/payment-methods.enum';

registerEnumType(ShippingStatus, { name: 'ShippingStatus' });
registerEnumType(PaymentMethods, { name: 'PaymentMethods' });

@InputType()
export class CreateOrderDto {
  @Field(() => String)
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => GraphQLISODateTime)
  orderDate: Date;

  @Field(() => GraphQLISODateTime)
  deliveryDate: Date;

  @Field(() => ShippingStatus)
  status: ShippingStatus;

  @Field(() => PaymentMethods)
  paymentMethod: PaymentMethods;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => Boolean)
  deleted: boolean;

  @Field(() => Int)
  userId: number;

  @Field(() => [Int])
  productIds: number[];

  @Field(() => Int)
  addressId: number;
}
