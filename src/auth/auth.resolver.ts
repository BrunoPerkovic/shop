import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/entities/users.entity';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from './guards/gql-authguard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Mutation(() => Users)
  async signupUser(
    @Args('createUserDto') createUserDto: CreateUserDto,
    @Args('createAddressDto') createAddressDto: CreateAddressDto,
  ): Promise<Users> {
    return this.usersService.createUser(createUserDto, createAddressDto);
  }

  @Mutation(() => LoginResponseDto)
  //@UseGuards(GqlJwtAuthGuard)
  async loginUser(
    /* @Context() context */ @Args('loginUserDto') loginUserDto: LoginUserDto,
  ): Promise<LoginResponseDto> {
    return this.authService.loginUser(loginUserDto);
  }
}
