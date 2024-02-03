import { OrdersRepository } from "@/app/repositories/orders-repository";

export const ordersGetAllService = async (
  userId: string,
  ordersRepository: OrdersRepository
) => {
  return await ordersRepository.getAll(userId);
};
