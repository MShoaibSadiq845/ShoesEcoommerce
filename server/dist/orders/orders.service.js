"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./order.schema");
const cart_service_1 = require("../cart/cart.service");
const users_service_1 = require("../users/users.service");
let OrdersService = class OrdersService {
    constructor(orderModel, cartService, usersService) {
        this.orderModel = orderModel;
        this.cartService = cartService;
        this.usersService = usersService;
    }
    async createOrder(userId, email) {
        const user = await this.usersService.findById(userId);
        let cart = this.cartService.getCart(userId);
        if (!cart || cart.items.length === 0) {
            cart = this.cartService.getCart('guest');
        }
        if (!cart || cart.items.length === 0) {
            throw new common_1.BadRequestException('Your cart is empty');
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
        this.cartService.clearCart(userId);
        this.cartService.clearCart('guest');
        return savedOrder;
    }
    async getAllOrders() {
        return this.orderModel.find().sort({ createdAt: -1 }).exec();
    }
    async getUserOrders(userId) {
        return this.orderModel.find({ userId }).sort({ createdAt: -1 }).exec();
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cart_service_1.CartService,
        users_service_1.UsersService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map