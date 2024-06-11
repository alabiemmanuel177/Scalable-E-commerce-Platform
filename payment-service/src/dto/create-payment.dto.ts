export class CreatePaymentDto {
  readonly orderId: number;
  readonly amount: number;
}

export class CreateTransactionDto {
  readonly status: string;
  readonly timestamp: Date;
}
