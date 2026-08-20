import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { CartService, CartState } from './cart.service';

export class AddToCartDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  quantity?: number;

  @IsString()
  @IsOptional()
  size?: string;
}

export class UpdateCartItemDto {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(): CartState {
    return this.cartService.getCart();
  }

  @Post()
  async addToCart(@Body() body: AddToCartDto): Promise<CartState> {
    return this.cartService.addToCart(body.productId, body.quantity || 1, body.size || 'US 10');
  }

  @Patch(':itemId')
  updateCartItem(@Param('itemId') itemId: string, @Body() body: UpdateCartItemDto): CartState {
    return this.cartService.updateCartItem(itemId, body.quantity);
  }

  @Delete(':itemId')
  removeCartItem(@Param('itemId') itemId: string): CartState {
    return this.cartService.removeCartItem(itemId);
  }

  @Delete()
  clearCart(): CartState {
    return this.cartService.clearCart();
  }
}
