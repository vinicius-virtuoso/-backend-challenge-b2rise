import { ICartItemsResponse } from "./../../interfaces/carts-items-interfaces";
import { CartsRepository } from "@/app/repositories/carts-repository";
import { OrdersItemsRepository } from "@/app/repositories/orders-items.repository";
import { OrdersRepository } from "@/app/repositories/orders-repository";

export const orderCreateService = async (
  userId: string,
  carsRepository: CartsRepository,
  ordersRepository: OrdersRepository,
  ordersItemsRepository: OrdersItemsRepository
) => {
  const cart = await carsRepository.get(userId);

  if (cart) {
    let order = await ordersRepository.create(userId);

    if (order) {
      for (let item of cart.products) {
        await ordersItemsRepository.create(
          order.id,
          item.product.id,
          item.product.price,
          item.quantity
        );
      }
      order = await ordersRepository.findById(userId, order.id);
      return order;
    }
  }
};
