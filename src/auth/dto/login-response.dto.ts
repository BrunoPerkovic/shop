import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class LoginResponseDto {
  @Field(() => String, {
    description: 'Generated access_token of the user',
  })
  access_token: string;

  @Field(() => User)
  user: User;
}
