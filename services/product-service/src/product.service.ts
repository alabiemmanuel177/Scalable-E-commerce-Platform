import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCategoryDto,
  CreateInventoryDto,
  CreateProductDto,
  UpdateCategoryDto,
  UpdateInventoryDto,
} from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Inventory } from './entities/inventory.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  // Product Methods
  findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['category', 'inventory'],
    });
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['category', 'inventory'],
    });
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const category = await this.categoryRepository.findOne({
      where: { id: createProductDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
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

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (updateProductDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateProductDto.categoryId },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
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

  async remove(id: number): Promise<{ message: string }> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.remove(product);

    return { message: 'Product deleted successfully' };
  }

  // Category Methods
  findAllCategories(): Promise<Category[]> {
    console.log('Reached here');

    return this.categoryRepository.find();
  }

  findCategoryById(id: number): Promise<Category> {
    return this.categoryRepository.findOne({ where: { id } });
  }

  createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    await this.categoryRepository.update(id, updateCategoryDto);
    return this.categoryRepository.findOne({ where: { id } });
  }

  async removeCategory(id: number): Promise<{ message: string }> {
    await this.categoryRepository.delete(id);
    return { message: 'Category deleted successfully' };
  }

  // Inventory Methods
  findAllInventories(): Promise<Inventory[]> {
    return this.inventoryRepository.find({ relations: ['product'] });
  }

  findInventoryById(id: number): Promise<Inventory> {
    return this.inventoryRepository.findOne({
      where: { id },
      relations: ['product'],
    });
  }

  createInventory(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    const inventory = this.inventoryRepository.create(createInventoryDto);
    return this.inventoryRepository.save(inventory);
  }

  async updateInventory(
    id: number,
    updateInventoryDto: UpdateInventoryDto,
  ): Promise<Inventory> {
    await this.inventoryRepository.update(id, updateInventoryDto);
    return this.inventoryRepository.findOne({
      where: { id },
      relations: ['product'],
    });
  }

  async removeInventory(id: number): Promise<{ message: string }> {
    await this.inventoryRepository.delete(id);
    return { message: 'Inventory deleted successfully' };
  }
}
