import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressResolver } from './address.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entity/address.entity';
import { Users } from 'src/users/entities/users.entity';
import { Order } from 'src/orders/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address, Users, Order])],
  exports: [AddressService],
  providers: [AddressService, AddressResolver],
})
export class AddressModule {}
