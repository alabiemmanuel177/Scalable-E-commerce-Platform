import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
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
  findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['category'] });
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.productRepository.update(id, updateProductDto);
    return this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
