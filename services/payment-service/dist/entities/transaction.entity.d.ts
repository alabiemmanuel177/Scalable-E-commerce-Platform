import { Payment } from './payment.entity';
export declare class Transaction {
    id: number;
    payment: Payment;
    status: string;
    timestamp: Date;
}
