import { CreateCategoryDto, CreateInventoryDto, CreateProductDto, UpdateCategoryDto, UpdateInventoryDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Inventory } from './entities/inventory.entity';
import { Product } from './entities/product.entity';
export declare class ProductService {
    private productRepository;
    private categoryRepository;
    private inventoryRepository;
    constructor(productRepository: Repository<Product>, categoryRepository: Repository<Category>, inventoryRepository: Repository<Inventory>);
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    create(createProductDto: CreateProductDto): Promise<Product>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: number): Promise<{
        message: string;
    }>;
    findAllCategories(): Promise<Category[]>;
    findCategoryById(id: number): Promise<Category>;
    createCategory(createCategoryDto: CreateCategoryDto): Promise<Category>;
    updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    removeCategory(id: number): Promise<{
        message: string;
    }>;
    findAllInventories(): Promise<Inventory[]>;
    findInventoryById(id: number): Promise<Inventory>;
    createInventory(createInventoryDto: CreateInventoryDto): Promise<Inventory>;
    updateInventory(id: number, updateInventoryDto: UpdateInventoryDto): Promise<Inventory>;
    removeInventory(id: number): Promise<{
        message: string;
    }>;
}
