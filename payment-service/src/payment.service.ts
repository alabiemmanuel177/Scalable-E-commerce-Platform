import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  CreatePaymentDto,
  CreateTransactionDto,
} from './dto/create-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Transaction } from './entities/transaction.entity';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PaymentService {
  private readonly PAYSTACK_API_URL = 'https://api.paystack.co';

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private httpService: HttpService,
  ) {}

  findOne(id: number): Promise<Payment> {
    return this.paymentRepository.findOne({
      where: { id },
      relations: ['transactions'],
    });
  }

  async create(createPaymentDto: CreatePaymentDto): Promise<any> {
    const payment = this.paymentRepository.create(createPaymentDto);
    await this.paymentRepository.save(payment);

    // Initiate the payment with Paystack
    const response = await lastValueFrom(
      this.httpService.post(
        `${this.PAYSTACK_API_URL}/transaction/initialize`,
        {
          email: createPaymentDto.email,
          amount: createPaymentDto.amount * 100,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        },
      ),
    );

    if (response.data.status) {
      // Save the transaction details
      const transaction = new Transaction();
      transaction.payment = payment;
      transaction.status = 'initialized';
      transaction.timestamp = new Date();
      await this.transactionRepository.save(transaction);

      // Update payment entity to include the authorization_url if required
      payment.authorization_url = response.data.data.authorization_url;
      await this.paymentRepository.save(payment);

      return {
        ...payment,
        authorization_url: response.data.data.authorization_url,
      };
    } else {
      throw new Error('Payment initialization failed');
    }
  }

  async createTransaction(
    paymentId: number,
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const transaction = this.transactionRepository.create({
      ...createTransactionDto,
      payment: await this.paymentRepository.findOne({
        where: { id: paymentId },
      }),
    });
    return this.transactionRepository.save(transaction);
  }
}
