import { Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrdersService } from './orders.service';
import { AdminGuard } from '../auth/admin.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createOrder(@Request() req: any) {
    return this.ordersService.createOrder(req.user.userId, req.user.email);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async getAllOrders() {
    const orders = await this.ordersService.getAllOrders();
    return orders.map((o: any) => ({
      id: o._id.toString(),
      userId: o.userId,
      userEmail: o.userEmail,
      userName: o.userName,
      items: o.items,
      totalAmount: o.totalAmount,
      status: o.status,
      createdAt: o.createdAt,
    }));
  }

  @Get('my-orders')
  @UseGuards(AuthGuard('jwt'))
  async getUserOrders(@Request() req: any) {
    const orders = await this.ordersService.getUserOrders(req.user.userId);
    return orders.map((o: any) => ({
      id: o._id.toString(),
      items: o.items,
      totalAmount: o.totalAmount,
      status: o.status,
      createdAt: o.createdAt,
    }));
  }
}
