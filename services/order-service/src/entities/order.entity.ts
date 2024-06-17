import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  status: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];
}
