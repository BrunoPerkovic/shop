import { InputType, Int, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreatePostDto {
  @Field(() => Int, { description: 'post title' })
  title: string;

  @Field(() => Int, { description: 'post content' })
  content: string;
}
