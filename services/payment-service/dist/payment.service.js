"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("./entities/payment.entity");
const transaction_entity_1 = require("./entities/transaction.entity");
const rxjs_1 = require("rxjs");
let PaymentService = class PaymentService {
    constructor(paymentRepository, transactionRepository, httpService) {
        this.paymentRepository = paymentRepository;
        this.transactionRepository = transactionRepository;
        this.httpService = httpService;
        this.PAYSTACK_API_URL = 'https://api.paystack.co';
    }
    findOne(id) {
        return this.paymentRepository.findOne({
            where: { id },
            relations: ['transactions'],
        });
    }
    async create(createPaymentDto) {
        const payment = this.paymentRepository.create(createPaymentDto);
        await this.paymentRepository.save(payment);
        const response = await (0, rxjs_1.lastValueFrom)(this.httpService.post(`${this.PAYSTACK_API_URL}/transaction/initialize`, {
            email: createPaymentDto.email,
            amount: createPaymentDto.amount * 100,
        }, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            },
        }));
        if (response.data.status) {
            const transaction = new transaction_entity_1.Transaction();
            transaction.payment = payment;
            transaction.status = 'initialized';
            transaction.timestamp = new Date();
            await this.transactionRepository.save(transaction);
            payment.authorization_url = response.data.data.authorization_url;
            await this.paymentRepository.save(payment);
            return {
                ...payment,
                authorization_url: response.data.data.authorization_url,
            };
        }
        else {
            throw new Error('Payment initialization failed');
        }
    }
    async createTransaction(paymentId, createTransactionDto) {
        const transaction = this.transactionRepository.create({
            ...createTransactionDto,
            payment: await this.paymentRepository.findOne({
                where: { id: paymentId },
            }),
        });
        return this.transactionRepository.save(transaction);
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(1, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        axios_1.HttpService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map