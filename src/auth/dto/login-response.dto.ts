import { Field, ObjectType } from '@nestjs/graphql';
import { Users } from 'src/users/entities/users.entity';

@ObjectType()
export class LoginResponseDto {
  @Field(() => String, {
    description: 'Generated access_token of the user',
  })
  access_token: string;

  @Field(() => Users)
  user: Users;
}
