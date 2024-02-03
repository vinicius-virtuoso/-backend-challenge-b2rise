import { CartsItemsRepository } from "@/app/repositories/carts-items";
import { CartsRepository } from "@/app/repositories/carts-repository";
import { ProductsRepository } from "@/app/repositories/products-repository";
import { PrismaCartsItemsRepository } from "@/infra/database/repositories/prisma-carts-items-repository";
import { PrismaCartsRepository } from "@/infra/database/repositories/prisma-carts-repository";
import { PrismaProductsRepository } from "@/infra/database/repositories/prisma-products-repository";
export const cartAddProduct = async (
  userId: string,
  productId: string,
  cartsRepository: CartsRepository = new PrismaCartsRepository(),
  productsRepository: ProductsRepository = new PrismaProductsRepository(),
  cartsItemsRepository: CartsItemsRepository = new PrismaCartsItemsRepository()
) => {
  let cart = await cartsRepository.get(userId);
  let count = 0;
  let total = 0;

  if (cart) {
    const productInCart = await cartsItemsRepository.get(cart.id, productId);

    if (productInCart) {
      await cartsItemsRepository.update(
        productInCart.id,
        cart.id,
        productId,
        productInCart.quantity + 1
      );
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

    const product = await productsRepository.findById(productId);
    if (product) {
      if (cart) {
        await cartsItemsRepository.create({
          cartId: cart.id,
          product,
          quantity: 1,
        });
      }

      cart = await cartsRepository.get(userId);
      if (cart) {
        count = cart.products.reduce((acc, att) => {
          return acc + att.quantity;
        }, 0);

        total = cart.products.reduce((acc, att) => {
          return acc + att.product.price * att.quantity;
        }, 0);

        return cartsRepository.update(cart.id, { count, total });
      }
    }
  }
};
