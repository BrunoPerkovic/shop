import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Address } from 'src/address/entity/address.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'first_name' })
  firstName: string;

  @Field()
  @Column({ name: 'last_name' })
  lastName: string;

  @Field()
  @Column({ name: 'address_id' })
  addressId: number;

  @Field()
  @Column({ name: 'user_name', unique: true })
  userName: string;

  @Field()
  @Column({ name: 'password' })
  password: string;

  @Field()
  @Column({ name: 'email', unique: true })
  email: string;

  @Field()
  @Column({ nullable: true, name: 'phone', unique: true })
  phone: string;

  @Field()
  @Column({ nullable: false, type: 'boolean' })
  deleted: boolean;

  @ManyToMany(() => Address, (address) => address.users)
  @JoinTable()
  addresses: Address[];
}
