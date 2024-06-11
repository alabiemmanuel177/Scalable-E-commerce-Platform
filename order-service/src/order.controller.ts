import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const order = await this.orderService.findOne(id);
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return order;
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Put(':id')
  async updateStatus(
    @Param('id') id: number,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    const order = await this.orderService.updateStatus(
      id,
      updateOrderStatusDto,
    );
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return order;
  }
}
