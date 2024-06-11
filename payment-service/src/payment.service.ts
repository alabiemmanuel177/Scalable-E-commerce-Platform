import { Injectable, HttpService } from '@nestjs/common';
import {
  CreatePaymentDto,
  CreateTransactionDto,
} from './dto/create-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Transaction } from './entities/transaction.entity';

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

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentRepository.create(createPaymentDto);
    await this.paymentRepository.save(payment);

    // Initiate the payment with Paystack
    const response = await this.httpService
      .post(
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
      )
      .toPromise();

    if (response.data.status) {
      // Save the transaction details
      const transaction = new Transaction();
      transaction.payment = payment;
      transaction.status = 'initialized';
      transaction.timestamp = new Date();
      await this.transactionRepository.save(transaction);

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
