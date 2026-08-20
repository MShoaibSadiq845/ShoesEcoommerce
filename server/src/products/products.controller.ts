import { Controller, Get, Post, Param, Body, UseGuards, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService, CreateProductDto } from './products.service';
import { AdminGuard } from '../auth/admin.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    // Normalize to always return id field
    return products.map((p: any) => ({
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

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    const product = await this.productsService.getProductById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return {
      id: (product as any)._id?.toString() || id,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      imageUrl: product.imageUrl,
      tag: product.tag,
      brand: product.brand,
    };
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async createProduct(@Body() dto: CreateProductDto) {
    const product = await this.productsService.createProduct(dto);
    return {
      id: (product as any)._id?.toString(),
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      imageUrl: product.imageUrl,
      tag: product.tag,
      brand: product.brand,
    };
  }
}
