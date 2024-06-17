import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Payment } from './payment.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Payment, (payment) => payment.transactions)
  payment: Payment;

  @Column()
  status: string;

  @Column()
  timestamp: Date;
}
