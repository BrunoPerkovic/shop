import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ProductService } from 'src/product/product.service';
import { AddressService } from 'src/address/address.service';
import { Users } from 'src/users/entities/users.entity';
import { Product } from 'src/product/entity/product.entity';
import { Address } from 'src/address/entity/address.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Users)
    private readonly usersService: UsersService,
    @InjectRepository(Product)
    private readonly productService: ProductService,
    @InjectRepository(Address)
    private readonly addressService: AddressService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, productIds, addressId, ...orderData } = createOrderDto;

    const user = await this.usersService.getUserById(userId);
    const products = await this.productService.getProductsByIds(productIds);
    const address = await this.addressService.getAddressById(addressId);

    const order = this.orderRepository.create({
      ...orderData,
      user,
      products,
      address,
    });

    return this.orderRepository.save(order);
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async getOrderById(id: number): Promise<Order> {
    return await this.orderRepository.findOneByOrFail({
      id: id,
    });
  }

  async updateOrder(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const order = await this.getOrderById(id);
    const { userId, productIds, addressId, ...orderData } = updateOrderDto;

    const user = await this.usersService.getUserById(userId);

    const products = await this.productService.getProductsByIds(productIds);

    const address = await this.addressService.getAddressById(addressId);

    order.user = user;
    order.products = products;
    order.address = address;
    order.name = orderData.name;
    order.price = orderData.price;

    return order;
  }

  async deleteOrder(id: number): Promise<void> {
    const order = await this.getOrderById(id);
    order.deleted = true;
    await this.orderRepository.save(order);
  }
}
