import { Category } from './category.entity';
import { Inventory } from './inventory.entity';
export declare class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: Category;
    inventory: Inventory;
}
