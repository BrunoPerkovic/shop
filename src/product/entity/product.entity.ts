import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column('integer')
  categoryId: number;

  @Field(() => Float)
  @Column('float')
  price: number;

  @Field()
  @Column()
  size: string;

  @Field()
  @Column()
  description: string;
}
