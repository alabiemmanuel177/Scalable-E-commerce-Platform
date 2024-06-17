import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Inventory } from './inventory.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToOne(() => Inventory, (inventory) => inventory.product, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  inventory: Inventory;
}
