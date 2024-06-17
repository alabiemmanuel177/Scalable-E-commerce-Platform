export declare class CreateOrderDto {
    readonly userId: number;
    readonly items: OrderItemDto[];
}
export declare class OrderItemDto {
    readonly productId: number;
    readonly quantity: number;
    readonly price: number;
}
export declare class UpdateOrderStatusDto {
    readonly status: string;
}
