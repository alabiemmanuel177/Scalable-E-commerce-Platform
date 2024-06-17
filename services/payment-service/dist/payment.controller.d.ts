import { PaymentService } from './payment.service';
import { CreatePaymentDto, CreateTransactionDto } from './dto/create-payment.dto';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    create(createPaymentDto: CreatePaymentDto): Promise<any>;
    createTransaction(id: number, createTransactionDto: CreateTransactionDto): Promise<import("./entities/transaction.entity").Transaction>;
}
