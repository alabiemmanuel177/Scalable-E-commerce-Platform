import { Injectable } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}
  findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['items'] });
  }

  findOne(id: number): Promise<Order> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create({
      userId: createOrderDto.userId,
      status: 'PENDING',
      items: createOrderDto.items.map((item) =>
        this.orderItemRepository.create(item),
      ),
    });
    return this.orderRepository.save(order);
  }

  async updateStatus(
    id: number,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (order) {
      order.status = updateOrderStatusDto.status;
      await this.orderRepository.save(order);
      return order;
    }
    return null;
  }
}
