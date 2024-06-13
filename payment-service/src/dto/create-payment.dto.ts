export class CreatePaymentDto {
  readonly email: string;
  readonly amount: number;
  readonly orderId: number; // Include the orderId here
}

export class CreateTransactionDto {
  readonly status: string;
  readonly timestamp: Date;
}
