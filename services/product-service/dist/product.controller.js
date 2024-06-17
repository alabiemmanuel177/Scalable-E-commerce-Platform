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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async findAll() {
        return this.productService.findAll();
    }
    async findOne(id) {
        const product = await this.productService.findOne(id);
        if (!product) {
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
        }
        return product;
    }
    async create(createProductDto) {
        return this.productService.create(createProductDto);
    }
    async update(id, updateProductDto) {
        const product = await this.productService.update(id, updateProductDto);
        if (!product) {
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
        }
        return product;
    }
    async remove(id) {
        const result = await this.productService.remove(id);
        if (!result) {
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async findAllCategories() {
        return this.productService.findAllCategories();
    }
    async findOneCategory(id) {
        const category = await this.productService.findCategoryById(id);
        if (!category) {
            throw new common_1.HttpException('Category not found', common_1.HttpStatus.NOT_FOUND);
        }
        return category;
    }
    async createCategory(createCategoryDto) {
        return this.productService.createCategory(createCategoryDto);
    }
    async updateCategory(id, updateCategoryDto) {
        const category = await this.productService.updateCategory(id, updateCategoryDto);
        if (!category) {
            throw new common_1.HttpException('Category not found', common_1.HttpStatus.NOT_FOUND);
        }
        return category;
    }
    async removeCategory(id) {
        const result = await this.productService.removeCategory(id);
        if (!result) {
            throw new common_1.HttpException('Category not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async findAllInventories() {
        return this.productService.findAllInventories();
    }
    async findOneInventory(id) {
        const inventory = await this.productService.findInventoryById(id);
        if (!inventory) {
            throw new common_1.HttpException('Inventory not found', common_1.HttpStatus.NOT_FOUND);
        }
        return inventory;
    }
    async createInventory(createInventoryDto) {
        return this.productService.createInventory(createInventoryDto);
    }
    async updateInventory(id, updateInventoryDto) {
        const inventory = await this.productService.updateInventory(id, updateInventoryDto);
        if (!inventory) {
            throw new common_1.HttpException('Inventory not found', common_1.HttpStatus.NOT_FOUND);
        }
        return inventory;
    }
    async removeInventory(id) {
        const result = await this.productService.removeInventory(id);
        if (!result) {
            throw new common_1.HttpException('Inventory not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('categories/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAllCategories", null);
__decorate([
    (0, common_1.Get)('categories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findOneCategory", null);
__decorate([
    (0, common_1.Post)('categories'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Put)('categories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_product_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)('categories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "removeCategory", null);
__decorate([
    (0, common_1.Get)('inventories/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAllInventories", null);
__decorate([
    (0, common_1.Get)('inventories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findOneInventory", null);
__decorate([
    (0, common_1.Post)('inventories'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateInventoryDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createInventory", null);
__decorate([
    (0, common_1.Put)('inventories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_product_dto_1.UpdateInventoryDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateInventory", null);
__decorate([
    (0, common_1.Delete)('inventories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "removeInventory", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map