import { ProductsService, CreateProductDto } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getAllProducts(): Promise<{
        id: any;
        name: any;
        price: any;
        description: any;
        category: any;
        imageUrl: any;
        tag: any;
        brand: any;
    }[]>;
    getProductById(id: string): Promise<{
        id: any;
        name: any;
        price: any;
        description: any;
        category: any;
        imageUrl: any;
        tag: any;
        brand: any;
    }>;
    createProduct(dto: CreateProductDto): Promise<{
        id: any;
        name: string;
        price: number;
        description: string;
        category: string;
        imageUrl: string;
        tag: string;
        brand: string;
    }>;
}
