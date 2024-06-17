export declare class CreatePaymentDto {
    readonly email: string;
    readonly amount: number;
    readonly orderId: number;
}
export declare class CreateTransactionDto {
    readonly status: string;
    readonly timestamp: Date;
}
