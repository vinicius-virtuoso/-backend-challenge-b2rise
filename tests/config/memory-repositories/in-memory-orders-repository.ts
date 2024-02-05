import { Orders } from "@/app/entities/orders-entity";
import { IOrderResponse } from "@/app/interfaces/orders-interfaces";
import { OrdersRepository } from "@/app/repositories/orders-repository";
import { orders_itemsMemory } from "./in-memory-orders-items-repository";
import { TestOrdersMapper } from "../mappers/orders-mapper";

export let ordersMemory: IOrderResponse[] = [];
export class InMemoryOrdersRepository implements OrdersRepository {
  async create(userId: string): Promise<IOrderResponse | null> {
    const order = new Orders({
      user_id: userId,
      date: new Date(),
      products: [],
    });
    ordersMemory.push(TestOrdersMapper.toDatabase(order));
    return TestOrdersMapper.toDomain(order);
  }
  async findById(
    userId: string,
    orderId: string
  ): Promise<IOrderResponse | null> {
    const orderFind = ordersMemory.find(
      (order) => order.id === orderId && order.user_id === userId
    );

    if (!orderFind) {
      return null;
    }

    return {
      id: orderFind.id,
      user_id: orderFind.user_id,
      date: orderFind.date,
      products: [
        ...orders_itemsMemory.filter(
          (order_item) => order_item.order_id === orderFind.id
        ),
      ],
    };
  }
  async getAll(
    page: number,
    take: number,
    userId: string
  ): Promise<[IOrderResponse[], number]> {
    throw new Error("Method not implemented.");
  }
  async delete(userId: string, orderId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
