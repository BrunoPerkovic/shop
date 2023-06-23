import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/entity/product.entity';
import { Address } from 'src/address/entity/address.entity';
import { Users } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentMethods } from '../enums/payment-methods.enum';
import { ShippingStatus } from '../enums/shipping-status.enum';

@ObjectType()
@Entity()
export class Order {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  orderDate: Date;

  @Field()
  @Column()
  deliveryDate: Date;

  @Field()
  @Column()
  status: ShippingStatus;

  @Field()
  @Column()
  paymentMethod: PaymentMethods;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  deleted: boolean;

  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.orders)
  user: Users;

  @Field(() => [Product])
  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @Field(() => Address)
  @ManyToOne(() => Address, (address) => address.orders)
  address: Address;
}
