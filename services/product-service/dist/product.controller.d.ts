import { ProductService } from './product.service';
import { CreateCategoryDto, CreateInventoryDto, CreateProductDto, UpdateCategoryDto, UpdateInventoryDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { Inventory } from './entities/inventory.entity';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    create(createProductDto: CreateProductDto): Promise<Product>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: number): Promise<void>;
    findAllCategories(): Promise<Category[]>;
    findOneCategory(id: number): Promise<Category>;
    createCategory(createCategoryDto: CreateCategoryDto): Promise<Category>;
    updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    removeCategory(id: number): Promise<void>;
    findAllInventories(): Promise<Inventory[]>;
    findOneInventory(id: number): Promise<Inventory>;
    createInventory(createInventoryDto: CreateInventoryDto): Promise<Inventory>;
    updateInventory(id: number, updateInventoryDto: UpdateInventoryDto): Promise<Inventory>;
    removeInventory(id: number): Promise<void>;
}
