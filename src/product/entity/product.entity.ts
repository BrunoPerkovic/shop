import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  category: string;

  @Column('float')
  @Field(() => Float)
  price: number;

  @Column()
  @Field()
  size: string;

  @Column()
  @Field()
  description: string;
}
