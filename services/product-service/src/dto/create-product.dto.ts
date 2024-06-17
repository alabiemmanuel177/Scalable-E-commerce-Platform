import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Product } from '../entities/product.entity';

export class CreateProductDto {
  @IsString() readonly name: string;
  @IsString() readonly description: string;
  @IsNumber() readonly price: number;
  @IsNumber() readonly categoryId: number;
  @IsNumber() readonly inventoryQuantity: number;
}
export class CreateCategoryDto {
  @IsString() readonly name: string;
}
export class UpdateCategoryDto {
  @IsString() @IsOptional() readonly name?: string;
}
export class CreateInventoryDto {
  readonly product: Product;
  @IsNumber() readonly quantity: number;
}
export class UpdateInventoryDto {
  @IsNumber() @IsOptional() readonly quantity?: number;
}
