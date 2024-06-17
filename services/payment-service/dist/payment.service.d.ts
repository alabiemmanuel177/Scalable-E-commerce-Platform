import { HttpService } from '@nestjs/axios';
import { CreatePaymentDto, CreateTransactionDto } from './dto/create-payment.dto';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Transaction } from './entities/transaction.entity';
export declare class PaymentService {
    private paymentRepository;
    private transactionRepository;
    private httpService;
    private readonly PAYSTACK_API_URL;
    constructor(paymentRepository: Repository<Payment>, transactionRepository: Repository<Transaction>, httpService: HttpService);
    findOne(id: number): Promise<Payment>;
    create(createPaymentDto: CreatePaymentDto): Promise<any>;
    createTransaction(paymentId: number, createTransactionDto: CreateTransactionDto): Promise<Transaction>;
}
