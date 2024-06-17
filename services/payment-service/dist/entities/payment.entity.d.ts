import { Transaction } from './transaction.entity';
export declare class Payment {
    id: number;
    orderId: number;
    amount: number;
    authorization_url?: string;
    transactions: Transaction[];
}
