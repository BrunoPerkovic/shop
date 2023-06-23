import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from 'src/category/entity/category.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity()
@ObjectType()
export class Product {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Float)
  @Column('float')
  price: number;

  @Field()
  @Column()
  size: string;

  @Field()
  @Column()
  description: string;

  @Field(() => [Category])
  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];

  @Field(() => [Order])
  @ManyToMany(() => Order, (order) => order.products)
  orders: Order[];
}
