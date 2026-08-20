import { CartService, CartState } from './cart.service';
export declare class AddToCartDto {
    productId: string;
    quantity?: number;
    size?: string;
}
export declare class UpdateCartItemDto {
    quantity: number;
}
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(): CartState;
    addToCart(body: AddToCartDto): Promise<CartState>;
    updateCartItem(itemId: string, body: UpdateCartItemDto): CartState;
    removeCartItem(itemId: string): CartState;
    clearCart(): CartState;
}
