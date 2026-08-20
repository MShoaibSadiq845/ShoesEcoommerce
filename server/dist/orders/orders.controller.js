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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const orders_service_1 = require("./orders.service");
const admin_guard_1 = require("../auth/admin.guard");
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async createOrder(req) {
        return this.ordersService.createOrder(req.user.userId, req.user.email);
    }
    async getAllOrders() {
        const orders = await this.ordersService.getAllOrders();
        return orders.map((o) => ({
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
    async getUserOrders(req) {
        const orders = await this.ordersService.getUserOrders(req.user.userId);
        return orders.map((o) => ({
            id: o._id.toString(),
            items: o.items,
            totalAmount: o.totalAmount,
            status: o.status,
            createdAt: o.createdAt,
        }));
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), admin_guard_1.AdminGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getAllOrders", null);
__decorate([
    (0, common_1.Get)('my-orders'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getUserOrders", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map