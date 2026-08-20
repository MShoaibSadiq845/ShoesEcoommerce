import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';
import { CartService } from '../cart/cart.service';
import { UsersService } from '../users/users.service';
export declare class OrdersService {
    private orderModel;
    private cartService;
    private usersService;
    constructor(orderModel: Model<OrderDocument>, cartService: CartService, usersService: UsersService);
    createOrder(userId: string, email: string): Promise<import("mongoose").Document<unknown, {}, OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getAllOrders(): Promise<OrderDocument[]>;
    getUserOrders(userId: string): Promise<OrderDocument[]>;
}
