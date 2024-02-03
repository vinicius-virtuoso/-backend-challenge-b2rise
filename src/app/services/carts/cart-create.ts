import { Carts } from "@/app/entities/carts-entity";
import { ICartRequest } from "@/app/interfaces/carts-interfaces";
import { CartsRepository } from "@/app/repositories/carts-repository";

export const cartCreateService = async (
  data: ICartRequest,
  cartsRepository: CartsRepository
) => {
  const cart = new Carts(data);
  await cartsRepository.create(cart);
};
