import { CartsItemsRepository } from "@/app/repositories/carts-items";
import { CartsRepository } from "@/app/repositories/carts-repository";
import { PrismaCartsItemsRepository } from "@/infra/database/repositories/prisma-carts-items-repository";
import { PrismaCartsRepository } from "@/infra/database/repositories/prisma-carts-repository";

export const cartRemoveProductService = async (
  userId: string,
  productId: string,
  cartsRepository: CartsRepository = new PrismaCartsRepository(),
  cartsItemsRepository: CartsItemsRepository = new PrismaCartsItemsRepository()
) => {
  let cart = await cartsRepository.get(userId);
  let count = 0;
  let total = 0;

  if (cart) {
    const cartItem = await cartsItemsRepository.get(cart.id, productId);

    if (cartItem) {
      await cartsItemsRepository.remove(cartItem.id, cart.id, productId);
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
  }
};
