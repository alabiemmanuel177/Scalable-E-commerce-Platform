export class CreateOrderDto {
  readonly userId: number;
  readonly items: OrderItemDto[];
}
export class OrderItemDto {
  readonly productId: number;
  readonly quantity: number;
  readonly price: number;
}
export class UpdateOrderStatusDto {
  readonly status: string;
}
