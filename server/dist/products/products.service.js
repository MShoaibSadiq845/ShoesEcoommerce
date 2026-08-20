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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("./product.schema");
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
let ProductsService = class ProductsService {
    constructor(productModel) {
        this.productModel = productModel;
        this.hygraphEndpoint = process.env.HYGRAPH_ENDPOINT;
    }
    async onModuleInit() {
        const count = await this.productModel.countDocuments();
        if (count === 0) {
            await this.productModel.insertMany(SEED_PRODUCTS);
            console.log('✅ Seeded initial products into MongoDB');
        }
    }
    async getProducts() {
        if (this.hygraphEndpoint) {
            try {
                const query = `
          query GetProducts {
            products {
              id
              name
              price
              description
              category
              image { url }
            }
          }
        `;
                const response = await fetch(this.hygraphEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query }),
                });
                if (response.ok) {
                    const json = await response.json();
                    if (json?.data?.products?.length > 0) {
                        return json.data.products.map((p, idx) => ({
                            _id: p.id || `hygraph-${idx}`,
                            id: p.id || `hygraph-${idx}`,
                            name: p.name,
                            price: p.price ?? 20.99,
                            description: p.description || '',
                            category: p.category || 'FOOTWEAR',
                            imageUrl: p.image?.url || SEED_PRODUCTS[idx % SEED_PRODUCTS.length].imageUrl,
                            tag: idx % 2 === 0 ? 'NEW' : 'FEATURED',
                            brand: 'NIKE',
                        }));
                    }
                }
            }
            catch (err) {
                console.warn('Hygraph fetch failed, using MongoDB:', err);
            }
        }
        return this.productModel.find().sort({ createdAt: -1 }).exec();
    }
    async getProductById(id) {
        if (!id)
            return null;
        try {
            if (typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/)) {
                const found = await this.productModel.findById(id).exec();
                if (found)
                    return found;
            }
        }
        catch (e) { }
        const all = await this.getProducts();
        return all.find((p) => p._id?.toString() === id || p.id === id) || null;
    }
    async createProduct(dto) {
        const product = new this.productModel(dto);
        return product.save();
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
//# sourceMappingURL=products.service.js.map