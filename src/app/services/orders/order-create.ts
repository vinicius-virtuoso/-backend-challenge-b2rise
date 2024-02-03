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
      cart.products.forEach(async (item) => {
        if (order) {
          await ordersItemsRepository.create(
            order.id,
            item.product.id,
            item.product.price
          );
        }
      });

      order = await ordersRepository.findById(order.id);
      return { count: cart.count, total: cart.total, ...order };
    }
  }
};
