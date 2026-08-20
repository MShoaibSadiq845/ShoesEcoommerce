import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';
import { CartService } from '../cart/cart.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private cartService: CartService,
    private usersService: UsersService,
  ) {}

  async createOrder(userId: string, email: string) {
    const user = await this.usersService.findById(userId);
    let cart = this.cartService.getCart(userId);

    if (!cart || cart.items.length === 0) {
      cart = this.cartService.getCart('guest');
    }

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Your cart is empty');
    }

    const order = new this.orderModel({
      userId,
      userEmail: user?.email || email,
      userName: user?.name || 'Customer',
      items: cart.items.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        itemTotal: item.itemTotal,
        imageUrl: item.imageUrl,
      })),
      totalAmount: cart.total,
      status: 'PLACED',
    });

    const savedOrder = await order.save();

    // Clear user's cart and guest cart after successful purchase
    this.cartService.clearCart(userId);
    this.cartService.clearCart('guest');

    return savedOrder;
  }

  async getAllOrders(): Promise<OrderDocument[]> {
    return this.orderModel.find().sort({ createdAt: -1 }).exec();
  }

  async getUserOrders(userId: string): Promise<OrderDocument[]> {
    return this.orderModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }
}
