import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from 'src/product/entity/product.entity';
import { Address } from 'src/address/entity/address.entity';
import { Users } from 'src/users/entities/users.entity';
import {
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
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
  status: string;

  @Field()
  @Column()
  paymentMethod: string;

  @Field()
  @Column()
  createdAt: Date;

  @Field()
  @Column()
  updatedAt: Date;

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
