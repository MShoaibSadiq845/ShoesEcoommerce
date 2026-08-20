import { ProductsService } from '../products/products.service';
export interface CartItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
    size: string;
    quantity: number;
    itemTotal: number;
}
export interface CartState {
    items: CartItem[];
    itemCount: number;
    subtotal: number;
    shipping: number;
    total: number;
}
export declare class CartService {
    private readonly productsService;
    private cartMap;
    constructor(productsService: ProductsService);
    private getItems;
    private toCartState;
    getCart(userId?: string): CartState;
    addToCart(productId: string, quantity?: number, size?: string, userId?: string): Promise<CartState>;
    updateCartItem(itemId: string, quantity: number, userId?: string): CartState;
    removeCartItem(itemId: string, userId?: string): CartState;
    clearCart(userId?: string): CartState;
}
