import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column({ name: 'user_name' })
  userName: string;

  @Field()
  @Column({ name: 'password' })
  password: string;

  @Field()
  @Column({ name: 'email' })
  email: string;

  @Field()
  @Column({ nullable: true, name: 'phone' })
  phone: string;

  @Field()
  @Column({ nullable: false, type: 'boolean' })
  deleted: boolean;
}
