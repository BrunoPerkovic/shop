import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/entities/users.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Mutation(() => Users)
  async signupUser(
    @Args('createUserDto') createUserDto: CreateUserDto,
  ): Promise<Users> {
    return this.usersService.createUser(createUserDto);
  }

  @Mutation(() => LoginResponseDto)
  async loginUser(
    @Args('loginUserDto') loginUserDto: LoginUserDto,
  ): Promise<LoginResponseDto> {
    return this.authService.loginUser(loginUserDto);
  }
}
