import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Product } from 'src/product/entity/product.entity';

@Entity()
@ObjectType()
export class Category {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'category_name' })
  categoryName: string;

  @Field(() => [Product])
  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
