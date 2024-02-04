import { IOrderResponse } from "../interfaces/orders-interfaces";

export abstract class OrdersRepository {
  abstract create(userId: string): Promise<IOrderResponse | null>;

  abstract findById(
    userId: string,
    orderId: string
  ): Promise<IOrderResponse | null>;

  abstract getAll(
    page: number,
    take: number,
    userId: string
  ): Promise<[IOrderResponse[], number]>;

  abstract delete(userId: string, orderId: string): Promise<void>;
}
