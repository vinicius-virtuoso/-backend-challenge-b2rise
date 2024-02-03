import { CartsItemsRepository } from "@/app/repositories/carts-items";
import { CartsRepository } from "@/app/repositories/carts-repository";

export const cartRemoveAllService = async (
  userId: string,
  cartsRepository: CartsRepository,
  cartsItemsRepository: CartsItemsRepository
) => {
  let cart = await cartsRepository.get(userId);
  let count = 0;
  let total = 0;

  if (cart) {
    await cartsItemsRepository.delete(cart.id);
    cart = await cartsRepository.get(userId);
    if (cart) {
      count = cart.products.reduce((acc, att) => {
        return acc + att.quantity;
      }, 0);

      total = cart.products.reduce((acc, att) => {
        return acc + att.product.price * att.quantity;
      }, 0);

      return await cartsRepository.update(cart.id, { count, total });
    }
  }
};
