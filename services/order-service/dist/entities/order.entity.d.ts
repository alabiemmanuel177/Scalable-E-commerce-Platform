import { OrderItem } from './order-item.entity';
export declare class Order {
    id: number;
    userId: number;
    status: string;
    items: OrderItem[];
}
