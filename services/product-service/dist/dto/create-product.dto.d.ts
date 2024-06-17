import { Product } from '../entities/product.entity';
export declare class CreateProductDto {
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly categoryId: number;
    readonly inventoryQuantity: number;
}
export declare class CreateCategoryDto {
    readonly name: string;
}
export declare class UpdateCategoryDto {
    readonly name?: string;
}
export declare class CreateInventoryDto {
    readonly product: Product;
    readonly quantity: number;
}
export declare class UpdateInventoryDto {
    readonly quantity?: number;
}
