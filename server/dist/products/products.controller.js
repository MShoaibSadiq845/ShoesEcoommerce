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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const products_service_1 = require("./products.service");
const admin_guard_1 = require("../auth/admin.guard");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async getAllProducts() {
        const products = await this.productsService.getProducts();
        return products.map((p) => ({
            id: p._id?.toString() || p.id,
            name: p.name,
            price: p.price,
            description: p.description,
            category: p.category,
            imageUrl: p.imageUrl,
            tag: p.tag,
            brand: p.brand,
        }));
    }
    async getProductById(id) {
        const product = await this.productsService.getProductById(id);
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return {
            id: product._id?.toString() || id,
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            imageUrl: product.imageUrl,
            tag: product.tag,
            brand: product.brand,
        };
    }
    async createProduct(dto) {
        const product = await this.productsService.createProduct(dto);
        return {
            id: product._id?.toString(),
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            imageUrl: product.imageUrl,
            tag: product.tag,
            brand: product.brand,
        };
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProduct", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map