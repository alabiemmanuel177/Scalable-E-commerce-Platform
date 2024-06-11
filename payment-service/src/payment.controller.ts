import {
  Controller,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import {
  CreatePaymentDto,
  CreateTransactionDto,
} from './dto/create-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Post(':id/transactions')
  async createTransaction(
    @Param('id') id: number,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    const payment = await this.paymentService.findOne(id);
    if (!payment) {
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }
    return this.paymentService.createTransaction(id, createTransactionDto);
  }
}
