import { Injectable, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class CartService {
  // Keyed by userId (or 'guest' for unauthenticated)
  private cartMap: Map<string, CartItem[]> = new Map();

  constructor(private readonly productsService: ProductsService) {}

  private getItems(userId = 'guest'): CartItem[] {
    if (!this.cartMap.has(userId)) {
      this.cartMap.set(userId, []);
    }
    return this.cartMap.get(userId)!;
  }

  private toCartState(items: CartItem[]): CartState {
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

  getCart(userId = 'guest'): CartState {
    let items = this.getItems(userId);
    // If specific user cart is empty but guest cart has items, transfer guest items to user!
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

  async addToCart(
    productId: string,
    quantity: number = 1,
    size: string = 'US 10',
    userId = 'guest',
    productData?: { name?: string; price?: number; imageUrl?: string; category?: string },
  ): Promise<CartState> {
    let product: any = null;
    try {
      product = await this.productsService.getProductById(productId);
    } catch (e) {
      // Ignore invalid ObjectId errors for external IDs like Hygraph
    }

    const name = product?.name || productData?.name || 'Footwear Product';
    const price = product?.price ?? productData?.price ?? 120;
    const imageUrl = product?.imageUrl || productData?.imageUrl || '/images/4.png';
    const category = product?.category || productData?.category || 'FOOTWEAR';
    const productId_ = (product as any)?._id?.toString() || productId;

    const items = this.getItems(userId);
    const existingIndex = items.findIndex(
      (item) => item.productId === productId_ && item.size === size,
    );

    if (existingIndex > -1) {
      const existing = items[existingIndex];
      const newQty = existing.quantity + quantity;
      items[existingIndex] = {
        ...existing,
        quantity: newQty,
        itemTotal: Number((existing.price * newQty).toFixed(2)),
      };
    } else {
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

  updateCartItem(itemId: string, quantity: number, userId = 'guest'): CartState {
    let items = this.getItems(userId);
    let itemIndex = items.findIndex((item) => item.id === itemId);

    // Fallback check guest items if not found in userId
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
      throw new NotFoundException(`Cart item with ID ${itemId} not found`);
    }

    if (quantity <= 0) {
      items.splice(itemIndex, 1);
    } else {
      const item = items[itemIndex];
      items[itemIndex] = {
        ...item,
        quantity,
        itemTotal: Number((item.price * quantity).toFixed(2)),
      };
    }

    return this.toCartState(items);
  }

  removeCartItem(itemId: string, userId = 'guest'): CartState {
    const items = this.getItems(userId);
    this.cartMap.set(userId, items.filter((item) => item.id !== itemId));
    this.cartMap.set('guest', this.getItems('guest').filter((item) => item.id !== itemId));
    return this.toCartState(this.getItems(userId));
  }

  clearCart(userId = 'guest'): CartState {
    this.cartMap.set(userId, []);
    if (userId !== 'guest') {
      this.cartMap.set('guest', []);
    }
    return this.toCartState([]);
  }
}
