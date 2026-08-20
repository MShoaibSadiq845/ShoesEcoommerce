import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { ProductDocument } from './product.schema';
export interface CreateProductDto {
    name: string;
    price: number;
    description?: string;
    category?: string;
    imageUrl?: string;
    tag?: string;
    brand?: string;
}
export declare class ProductsService implements OnModuleInit {
    private productModel;
    private readonly hygraphEndpoint;
    constructor(productModel: Model<ProductDocument>);
    onModuleInit(): Promise<void>;
    getProducts(): Promise<ProductDocument[]>;
    getProductById(id: string): Promise<any | null>;
    createProduct(dto: CreateProductDto): Promise<ProductDocument>;
}
