import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';
import { Users } from 'src/users/entities/users.entity';
import { Order } from 'src/orders/entities/order.entity';
import { County } from '../enums/county.enum';
import { CountyCodesCroatia } from '../enums/county_codes.enum';

registerEnumType(County, {
  name: 'County',
  description: 'Counties in Croatia',
});

registerEnumType(CountyCodesCroatia, {
  name: 'CountyCodesCroatia',
  description: 'County codes in Croatia',
});

@Entity()
@ObjectType()
export class Address {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int, { nullable: false })
  @Column({ name: 'street_number' })
  streetNumber: number;

  @Field()
  @Column({ name: 'street' })
  street: string;

  @Field()
  @Column({ name: 'city' })
  city: string;

  @Field(() => County)
  @Column({
    name: 'county',
    type: 'enum',
    enum: County,
    nullable: false,
  })
  county: County;

  @Field(() => CountyCodesCroatia)
  @Column({
    name: 'county_code',
    type: 'enum',
    enum: CountyCodesCroatia,
    nullable: false,
  })
  countyCode: CountyCodesCroatia;

  @Field()
  @Column({ name: 'country' })
  country: string;

  @Field(() => Int, { nullable: false })
  @Column({ name: 'postal_code' })
  postalCode: number;

  @Field(() => [Users])
  @OneToMany(() => Users, (user) => user.address)
  users: Users[];

  @Field(() => [Order])
  @OneToMany(() => Order, (order) => order.address)
  orders: Order[];
}
