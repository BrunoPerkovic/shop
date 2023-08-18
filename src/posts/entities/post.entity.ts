import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Users } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class Post {
  @Field(() => Int, { description: 'post id' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: 'post title' })
  @Column({ nullable: false })
  title: string;

  @Field(() => String, { description: 'post content' })
  @Column({ nullable: false })
  content: string;

  @Field(() => Date, { description: 'post creation date' })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date, { description: 'post update date' })
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Int, { description: 'total likes' })
  @Column({ default: 1 })
  likes: number;

  @Field(() => Int, { description: 'total comments' })
  @Column({ default: 0 })
  comments: number;

  @Field(() => Boolean, { description: 'post is archived' })
  @Column({ default: false })
  isArchived: boolean;

  @Field(() => Users, { description: 'author id' })
  @ManyToOne(() => Users, (user) => user.posts)
  author: Users; // Should be 'Users' instead of 'Users'
}
