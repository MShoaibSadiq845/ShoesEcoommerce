import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(req: any): Promise<import("mongoose").Document<unknown, {}, import("./order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./order.schema").Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getAllOrders(): Promise<{
        id: any;
        userId: any;
        userEmail: any;
        userName: any;
        items: any;
        totalAmount: any;
        status: any;
        createdAt: any;
    }[]>;
    getUserOrders(req: any): Promise<{
        id: any;
        items: any;
        totalAmount: any;
        status: any;
        createdAt: any;
    }[]>;
}
