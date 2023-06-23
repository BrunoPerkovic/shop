import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Address } from 'src/address/entity/address.entity';
import { Order } from 'src/orders/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Users {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Field()
  @Column({ name: 'last_name', nullable: false })
  lastName: string;

  @Field()
  @Column({ name: 'user_name', unique: true, nullable: false })
  userName: string;

  @Field()
  @Column({ name: 'password', nullable: false })
  password: string;

  @Field()
  @Column({ name: 'email', unique: true, nullable: false })
  email: string;

  @Field()
  @Column({ name: 'phone', unique: true, nullable: true })
  phone: string;

  @Field()
  @Column({ name: 'deleted', type: 'boolean', nullable: false })
  deleted: boolean;

  @Field()
  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @Field(() => Address, { nullable: false })
  @ManyToOne(() => Address, (address) => address.users)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Field(() => [Order])
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
