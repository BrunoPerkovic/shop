import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Mutation(() => LoginResponseDto)
  async login(
    @Args('loginUserDto') loginUserDto: LoginUserDto,
    @Context() context,
  ) {
    return this.authService.loginUser(context.user);
  }

  @Mutation(() => User)
  async signup(@Args('loginUserDto') id: number, loginUserDto: LoginUserDto) {
    const user = await this.usersService.getUserById(id);

    if (user) {
      throw new Error('User Already Exists');
    }

    return this.usersService.createUser();
  }
}
