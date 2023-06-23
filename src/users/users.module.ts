import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Address } from 'src/address/entity/address.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/product/entity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Address, Order, Product])],
  exports: [UsersService, UsersResolver],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
