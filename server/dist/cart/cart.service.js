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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("../products/products.service");
let CartService = class CartService {
    constructor(productsService) {
        this.productsService = productsService;
        this.cartMap = new Map();
    }
    getItems(userId = 'guest') {
        if (!this.cartMap.has(userId)) {
            this.cartMap.set(userId, []);
        }
        return this.cartMap.get(userId);
    }
    toCartState(items) {
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = items.reduce((sum, item) => sum + item.itemTotal, 0);
        const shipping = subtotal > 0 ? 10.0 : 0.0;
        const total = subtotal + shipping;
        return {
            items,
            itemCount,
            subtotal: Number(subtotal.toFixed(2)),
            shipping: Number(shipping.toFixed(2)),
            total: Number(total.toFixed(2)),
        };
    }
    getCart(userId = 'guest') {
        let items = this.getItems(userId);
        if (items.length === 0 && userId !== 'guest') {
            const guestItems = this.getItems('guest');
            if (guestItems.length > 0) {
                this.cartMap.set(userId, [...guestItems]);
                this.cartMap.set('guest', []);
                items = this.getItems(userId);
            }
        }
        return this.toCartState(items);
    }
    async addToCart(productId, quantity = 1, size = 'US 10', userId = 'guest') {
        const product = await this.productsService.getProductById(productId);
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${productId} not found`);
        }
        const items = this.getItems(userId);
        const existingIndex = items.findIndex((item) => item.productId === productId && item.size === size);
        const productId_ = product._id?.toString() || productId;
        const imageUrl = product.imageUrl;
        const name = product.name;
        const price = product.price;
        const category = product.category;
        if (existingIndex > -1) {
            const existing = items[existingIndex];
            const newQty = existing.quantity + quantity;
            items[existingIndex] = {
                ...existing,
                quantity: newQty,
                itemTotal: Number((existing.price * newQty).toFixed(2)),
            };
        }
        else {
            items.push({
                id: `cart-item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
                productId: productId_,
                name,
                price,
                imageUrl,
                category,
                size,
                quantity,
                itemTotal: Number((price * quantity).toFixed(2)),
            });
        }
        return this.toCartState(items);
    }
    updateCartItem(itemId, quantity, userId = 'guest') {
        let items = this.getItems(userId);
        let itemIndex = items.findIndex((item) => item.id === itemId);
        if (itemIndex === -1 && userId !== 'guest') {
            items = this.getItems('guest');
            itemIndex = items.findIndex((item) => item.id === itemId);
            if (itemIndex > -1) {
                this.cartMap.set(userId, [...items]);
                this.cartMap.set('guest', []);
                items = this.getItems(userId);
            }
        }
        if (itemIndex === -1) {
            throw new common_1.NotFoundException(`Cart item with ID ${itemId} not found`);
        }
        if (quantity <= 0) {
            items.splice(itemIndex, 1);
        }
        else {
            const item = items[itemIndex];
            items[itemIndex] = {
                ...item,
                quantity,
                itemTotal: Number((item.price * quantity).toFixed(2)),
            };
        }
        return this.toCartState(items);
    }
    removeCartItem(itemId, userId = 'guest') {
        const items = this.getItems(userId);
        this.cartMap.set(userId, items.filter((item) => item.id !== itemId));
        this.cartMap.set('guest', this.getItems('guest').filter((item) => item.id !== itemId));
        return this.toCartState(this.getItems(userId));
    }
    clearCart(userId = 'guest') {
        this.cartMap.set(userId, []);
        if (userId !== 'guest') {
            this.cartMap.set('guest', []);
        }
        return this.toCartState([]);
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], CartService);
//# sourceMappingURL=cart.service.js.map