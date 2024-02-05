import { OrdersItemsRepository } from "@/app/repositories/orders-items.repository";
import { randomUUID } from "node:crypto";
import { TestOrdersItemsMapper } from "../mappers/orders-items-mapper";
import { productsMemory } from "./in-memory-products-repository";

export let orders_itemsMemory: {
  id: string;
  order_id: string;
  product: {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    price?: any;
  };
  price: number;
  quantity: number;
}[] = [];

export class InMemoryOrdersItemsRepository implements OrdersItemsRepository {
  async create(
    orderId: string,
    productId: string,
    price: number,
    quantity: number
  ): Promise<void> {
    const product = productsMemory.find((product) => product.id === productId);
    if (product) {
      orders_itemsMemory.push(
        TestOrdersItemsMapper.toDatabase({
          id: randomUUID(),
          orderId,
          product: product,
          price,
          quantity,
        })
      );
    }
  }
}
