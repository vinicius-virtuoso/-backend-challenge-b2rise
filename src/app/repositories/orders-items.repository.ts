export abstract class OrdersItemsRepository {
  abstract create(
    orderId: string,
    productId: string,
    price: number,
    quantity: number
  ): Promise<void>;
}
