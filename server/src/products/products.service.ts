import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

const SEED_PRODUCTS = [
  {
    name: 'Air Max 97',
    price: 20.99,
    description: 'Iconic sneaker design with full-length Nike Air unit for ultimate comfort and dynamic street style.',
    category: 'SNEAKERS',
    imageUrl: '/images/4.png',
    tag: 'NEW',
    brand: 'NIKE',
  },
  {
    name: 'React Presto',
    price: 20.99,
    description: 'Lightweight foam cushioning paired with flexible mesh for all-day responsive stability.',
    category: 'RUNNING',
    imageUrl: '/images/6.png',
    tag: 'POPULAR',
    brand: 'NIKE',
  },
  {
    name: 'KD13 EP',
    price: 20.99,
    description: 'Pro-level basketball shoe engineered for high performance and court control.',
    category: 'BASKETBALL',
    imageUrl: '/images/17.png',
    tag: 'HOT',
    brand: 'NIKE',
  },
  {
    name: 'AIR JORDAN 1 MID LIGHT SMOKE GREY',
    price: 145.00,
    description: 'Classic heritage style featuring premium leather and signature Air-Sole cushioning.',
    category: 'JORDAN',
    imageUrl: '/images/8.png',
    tag: 'NEW',
    brand: 'JORDAN',
  },
  {
    name: 'Air Max 200 SE',
    price: 120.00,
    description: 'Bold design elements inspired by energy and motion with maximum Air comfort.',
    category: 'LIFESTYLE',
    imageUrl: '/images/16.png',
    tag: 'FEATURED',
    brand: 'NIKE',
  },
  {
    name: 'Nike Air Max 270 Sunset',
    price: 160.00,
    description: 'Vibrant sunset gradient colorway with large volume heel Air cushioning unit.',
    category: 'LIFESTYLE',
    imageUrl: '/images/6.png',
    tag: 'LIMITED',
    brand: 'NIKE',
  },
];

export interface CreateProductDto {
  name: string;
  price: number;
  description?: string;
  category?: string;
  imageUrl?: string;
  tag?: string;
  brand?: string;
}

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async onModuleInit() {
    const count = await this.productModel.countDocuments();
    if (count === 0) {
      await this.productModel.insertMany(SEED_PRODUCTS);
      console.log('✅ Seeded initial products into MongoDB');
    }
  }

  async getProducts(): Promise<any[]> {
    const hygraphEndpoint = this.configService.get<string>('HYGRAPH_ENDPOINT') || process.env.HYGRAPH_ENDPOINT;
    const hygraphToken = this.configService.get<string>('HYGRAPH_TOKEN') || process.env.HYGRAPH_TOKEN;

    if (hygraphEndpoint) {
      try {
        const query = `
          query GetHygraphProducts {
            productsses {
              id
              name
              price
              description
              category
              tag
              brand
              image {
                url
              }
            }
          }
        `;
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        if (hygraphToken) {
          headers['Authorization'] = `Bearer ${hygraphToken}`;
        }

        const response = await fetch(hygraphEndpoint, {
          method: 'POST',
          headers,
          body: JSON.stringify({ query }),
        });

        if (response.ok) {
          const json = await response.json();
          const items = json?.data?.productsses || json?.data?.products || [];
          if (items.length > 0) {
            return items.map((p: any, idx: number) => ({
              _id: p.id || `hygraph-${idx}`,
              id: p.id || `hygraph-${idx}`,
              name: p.name,
              price: Number(p.price ?? 20.99),
              description: p.description || '',
              category: p.category || 'FOOTWEAR',
              imageUrl: p.image?.url || SEED_PRODUCTS[idx % SEED_PRODUCTS.length].imageUrl,
              tag: p.tag || (idx % 2 === 0 ? 'NEW' : 'FEATURED'),
              brand: p.brand || 'NIKE',
            }));
          }
        }
      } catch (err) {
        console.warn('Hygraph fetch failed, using MongoDB:', err);
      }
    }
    return this.productModel.find().sort({ createdAt: -1 }).exec();
  }

  async getProductById(id: string): Promise<any | null> {
    if (!id) return null;
    try {
      if (typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/)) {
        const found = await this.productModel.findById(id).exec();
        if (found) return found;
      }
    } catch (e) {}
    const all = await this.getProducts();
    return all.find((p: any) => p._id?.toString() === id || p.id === id) || null;
  }

  async createProduct(dto: CreateProductDto): Promise<ProductDocument> {
    const product = new this.productModel(dto);
    return product.save();
  }
}
