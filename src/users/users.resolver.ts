import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OnlySameUserByIdAllowed } from './users.interceptor';
import { UpdateUserDto } from './dto/update-user.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.getAllUsers();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('username') id: number) {
    return this.usersService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(OnlySameUserByIdAllowed)
  @Mutation(() => User)
  updateUser(@Args('updateUserDto') upadteUserDto: UpdateUserDto) {
    return this.usersService.updateUser(upadteUserDto.id, upadteUserDto);
  }
}
