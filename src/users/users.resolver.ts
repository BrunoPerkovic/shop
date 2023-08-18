import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { UseInterceptors } from '@nestjs/common';
import { OnlySameUserByIdAllowed } from './users.interceptor';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateAddressDto } from 'src/address/dto/update-address.dto';

@Resolver(() => Users)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [Users], { name: 'users' })
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Query(() => Users, { name: 'userById' })
  getUserById(
    @Args('id', {
      type: () => Int,
    })
    id: number,
  ) {
    return this.usersService.getUserById(id);
  }

  @Query(() => Users, { name: 'userByName' })
  getUserByName(
    @Args('userName', {
      type: () => String,
    })
    userName: string,
  ) {
    return this.usersService.getUserByUsername(userName);
  }

  @Query(() => Users, { name: 'userByEmail' })
  getUserByEmail(
    @Args('email', {
      type: () => String,
    })
    email: string,
  ) {
    return this.usersService.getUserByEmail(email);
  }

  //@UseGuards(JwtAuthGuard)
  @UseInterceptors(OnlySameUserByIdAllowed)
  @Mutation(() => Users)
  updateUser(
    @Args('updateUserDto') upadteUserDto: UpdateUserDto,
    @Args('updateAddressDto') updateAddressDto: UpdateAddressDto,
  ) {
    return this.usersService.updateUser(
      upadteUserDto.id,
      upadteUserDto,
      updateAddressDto,
    );
  }

  //@UseGuards(JwtAuthGuard)
  @UseInterceptors(OnlySameUserByIdAllowed)
  @Mutation(() => Users)
  async deleteUser(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.usersService.deleteUser(id);
    return true;
  }
}
