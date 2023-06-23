import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginUserDto {
  @Field(() => String, { description: 'Users username on the platform' })
  username: string;

  @Field(() => String, { description: 'Users password on the platform' })
  password: string;
}
