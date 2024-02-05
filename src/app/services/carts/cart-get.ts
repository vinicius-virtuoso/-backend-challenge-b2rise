import { CartsRepository } from "@/app/repositories/carts-repository";

export const cartGetService = async (
  userId: string,
  cartsRepository: CartsRepository
) => {
  return await cartsRepository.get(userId);
};
