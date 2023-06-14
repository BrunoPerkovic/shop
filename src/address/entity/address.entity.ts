import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@ObjectType()
export class Address {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'user_id' })
  userId: number;

  @Field()
  @Column({ name: 'street' })
  street: string;

  @Field()
  @Column({ name: 'street_number' })
  streetNumber: number;

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

  @ManyToMany(() => User, (user) => user.addresses)
  users: User[];
}
