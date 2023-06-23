import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Users } from 'src/users/entities/users.entity';
import { Product } from 'src/product/entity/product.entity';
import { Address } from 'src/address/entity/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Address, Users, Product])],
  exports: [OrdersService],
  providers: [OrdersResolver, OrdersService],
})
export class OrdersModule {}
