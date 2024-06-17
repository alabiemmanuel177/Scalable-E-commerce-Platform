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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./entities/category.entity");
const inventory_entity_1 = require("./entities/inventory.entity");
const product_entity_1 = require("./entities/product.entity");
let ProductService = class ProductService {
    constructor(productRepository, categoryRepository, inventoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.inventoryRepository = inventoryRepository;
    }
    findAll() {
        return this.productRepository.find({
            relations: ['category', 'inventory'],
        });
    }
    findOne(id) {
        return this.productRepository.findOne({
            where: { id },
            relations: ['category', 'inventory'],
        });
    }
    async create(createProductDto) {
        const category = await this.categoryRepository.findOne({
            where: { id: createProductDto.categoryId },
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        const product = this.productRepository.create({
            ...createProductDto,
            category,
        });
        const savedProduct = await this.productRepository.save(product);
        const inventory = this.inventoryRepository.create({
            product: savedProduct,
            quantity: createProductDto.inventoryQuantity,
        });
        await this.inventoryRepository.save(inventory);
        return this.productRepository.findOne({
            where: { id: savedProduct.id },
            relations: ['category', 'inventory'],
        });
    }
    async update(id, updateProductDto) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        if (updateProductDto.categoryId) {
            const category = await this.categoryRepository.findOne({
                where: { id: updateProductDto.categoryId },
            });
            if (!category) {
                throw new common_1.NotFoundException('Category not found');
            }
            product.category = category;
        }
        await this.productRepository.update(id, updateProductDto);
        if (updateProductDto.inventoryQuantity !== undefined) {
            const inventory = await this.inventoryRepository.findOne({
                where: { product: { id } },
            });
            if (inventory) {
                inventory.quantity = updateProductDto.inventoryQuantity;
                await this.inventoryRepository.save(inventory);
            }
        }
        return this.productRepository.findOne({
            where: { id },
            relations: ['category', 'inventory'],
        });
    }
    async remove(id) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        await this.productRepository.remove(product);
        return { message: 'Product deleted successfully' };
    }
    findAllCategories() {
        console.log('Reached here');
        return this.categoryRepository.find();
    }
    findCategoryById(id) {
        return this.categoryRepository.findOne({ where: { id } });
    }
    createCategory(createCategoryDto) {
        const category = this.categoryRepository.create(createCategoryDto);
        return this.categoryRepository.save(category);
    }
    async updateCategory(id, updateCategoryDto) {
        await this.categoryRepository.update(id, updateCategoryDto);
        return this.categoryRepository.findOne({ where: { id } });
    }
    async removeCategory(id) {
        await this.categoryRepository.delete(id);
        return { message: 'Category deleted successfully' };
    }
    findAllInventories() {
        return this.inventoryRepository.find({ relations: ['product'] });
    }
    findInventoryById(id) {
        return this.inventoryRepository.findOne({
            where: { id },
            relations: ['product'],
        });
    }
    createInventory(createInventoryDto) {
        const inventory = this.inventoryRepository.create(createInventoryDto);
        return this.inventoryRepository.save(inventory);
    }
    async updateInventory(id, updateInventoryDto) {
        await this.inventoryRepository.update(id, updateInventoryDto);
        return this.inventoryRepository.findOne({
            where: { id },
            relations: ['product'],
        });
    }
    async removeInventory(id) {
        await this.inventoryRepository.delete(id);
        return { message: 'Inventory deleted successfully' };
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(2, (0, typeorm_1.InjectRepository)(inventory_entity_1.Inventory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map