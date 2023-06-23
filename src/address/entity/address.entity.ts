import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';
import { Users } from 'src/users/entities/users.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity()
@ObjectType()
export class Address {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'user_id' })
  userId: number;

  @Field()
  @Column({ name: 'street_number' })
  streetNumber: number;

  @Field()
  @Column({ name: 'street' })
  street: string;

  @Field()
  @Column({ name: 'city' })
  city: string;

  @Field()
  @Column({ name: 'county' })
  county: string;

  @Field()
  @Column({ name: 'country' })
  country: string;

  @Field()
  @Column({ name: 'postal_code' })
  postalCode: number;

  @Field(() => [Users])
  @OneToMany(() => Users, (user) => user.address)
  users: Users[];

  @Field(() => [Order])
  @OneToMany(() => Order, (order) => order.address)
  orders: Order[];
}
