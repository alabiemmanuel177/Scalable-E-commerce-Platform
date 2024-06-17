import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @OneToOne(() => Product, (product) => product.inventory)
  product: Product;
}
