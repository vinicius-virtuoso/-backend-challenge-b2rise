import { CartsRepository } from "@/app/repositories/carts-repository";
import { PrismaCartsRepository } from "@/infra/database/repositories/prisma-carts-repository";

export const cartGetService = async (
  userId: string,
  cartsRepository: CartsRepository
) => {
  return await cartsRepository.get(userId);
};
