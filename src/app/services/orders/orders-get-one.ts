import { OrdersRepository } from "@/app/repositories/orders-repository";

export const ordersGetOneService = async (
  userId: string,
  orderId: string,
  ordersRepository: OrdersRepository
) => {
  const order = await ordersRepository.findById(userId, orderId);
  return order;
};
