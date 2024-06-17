import { Order } from './order.entity';
export declare class OrderItem {
    id: number;
    order: Order;
    productId: number;
    quantity: number;
    price: number;
}
