import { Carts } from "@/app/entities/carts-entity";
import { ICartRequest } from "@/app/interfaces/carts-interfaces";
import { CartsRepository } from "@/app/repositories/carts-repository";
import { PrismaCartsRepository } from "@/infra/database/repositories/prisma-carts-repository";

export const cartCreateService = async (
  data: ICartRequest,
  cartsRepository: CartsRepository = new PrismaCartsRepository()
) => {
  const cart = new Carts(data);
  await cartsRepository.create(cart);
};
