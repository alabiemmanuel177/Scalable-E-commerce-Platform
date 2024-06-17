import { CreateOrderDto, UpdateOrderStatusDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
export declare class OrderService {
    private orderRepository;
    private orderItemRepository;
    constructor(orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>);
    findAll(): Promise<Order[]>;
    findOne(id: number): Promise<Order>;
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    updateStatus(id: number, updateOrderStatusDto: UpdateOrderStatusDto): Promise<Order>;
}
