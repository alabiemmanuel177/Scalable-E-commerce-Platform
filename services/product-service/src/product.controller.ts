import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateCategoryDto,
  CreateInventoryDto,
  CreateProductDto,
  UpdateCategoryDto,
  UpdateInventoryDto,
} from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { Inventory } from './entities/inventory.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    const product = await this.productService.findOne(id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productService.update(id, updateProductDto);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    const result = await this.productService.remove(id);
    if (!result) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }

  // Category Endpoints
  @Get('categories/all')
  async findAllCategories(): Promise<Category[]> {
    return this.productService.findAllCategories();
  }

  @Get('categories/:id')
  async findOneCategory(@Param('id') id: number): Promise<Category> {
    const category = await this.productService.findCategoryById(id);
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return category;
  }

  @Post('categories')
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.productService.createCategory(createCategoryDto);
  }

  @Put('categories/:id')
  async updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.productService.updateCategory(
      id,
      updateCategoryDto,
    );
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return category;
  }

  @Delete('categories/:id')
  async removeCategory(@Param('id') id: number): Promise<void> {
    const result = await this.productService.removeCategory(id);
    if (!result) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
  }

  // Inventory Endpoints

  @Get('inventories/all')
  async findAllInventories(): Promise<Inventory[]> {
    return this.productService.findAllInventories();
  }

  @Get('inventories/:id')
  async findOneInventory(@Param('id') id: number): Promise<Inventory> {
    const inventory = await this.productService.findInventoryById(id);
    if (!inventory) {
      throw new HttpException('Inventory not found', HttpStatus.NOT_FOUND);
    }
    return inventory;
  }

  @Post('inventories')
  async createInventory(
    @Body() createInventoryDto: CreateInventoryDto,
  ): Promise<Inventory> {
    return this.productService.createInventory(createInventoryDto);
  }

  @Put('inventories/:id')
  async updateInventory(
    @Param('id') id: number,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ): Promise<Inventory> {
    const inventory = await this.productService.updateInventory(
      id,
      updateInventoryDto,
    );
    if (!inventory) {
      throw new HttpException('Inventory not found', HttpStatus.NOT_FOUND);
    }
    return inventory;
  }

  @Delete('inventories/:id')
  async removeInventory(@Param('id') id: number): Promise<void> {
    const result = await this.productService.removeInventory(id);
    if (!result) {
      throw new HttpException('Inventory not found', HttpStatus.NOT_FOUND);
    }
  }
}
