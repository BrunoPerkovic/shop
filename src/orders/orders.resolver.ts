import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Role } from 'src/auth/roles/auth.roles';
import { Roles } from 'src/auth/roles/roles.decorator';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly orderService: OrdersService) {}

  @Roles(Role.Admin)
  @Mutation(() => Order)
  async createOrder(
    @Args('createOrderDto') createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    return await this.orderService.createOrder(createOrderDto);
  }

  @Roles(Role.Admin)
  @Query(() => [Order], { name: 'orders' })
  async getAllOrders(): Promise<Order[]> {
    return await this.orderService.getAllOrders();
  }

  @Roles(Role.Admin)
  @Query(() => Order, { name: 'order' })
  async getOrderById(
    @Args('id', {
      type: () => Int,
    })
    id: number,
  ): Promise<Order> {
    return await this.orderService.getOrderById(id);
  }

  @Roles(Role.Admin)
  @Mutation(() => Order)
  async updateOrder(
    @Args('id', {
      type: () => Int,
    })
    id: number,
    @Args('updateOrderDto') updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return await this.orderService.updateOrder(id, updateOrderDto);
  }

  @Roles(Role.Admin)
  @Mutation(() => Boolean)
  async deleteOrder(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<void> {
    await this.orderService.deleteOrder(id);
  }
}
