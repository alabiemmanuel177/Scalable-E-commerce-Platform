import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/create-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    findAll(): Promise<import("./entities/order.entity").Order[]>;
    findOne(id: number): Promise<import("./entities/order.entity").Order>;
    create(createOrderDto: CreateOrderDto): Promise<import("./entities/order.entity").Order>;
    updateStatus(id: number, updateOrderStatusDto: UpdateOrderStatusDto): Promise<import("./entities/order.entity").Order>;
}
