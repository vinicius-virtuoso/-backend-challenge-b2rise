import {
  ICartItemsRequest,
  ICartItemsResponse,
} from "@/app/interfaces/carts-items-interfaces";
import { CartsItemsRepository } from "@/app/repositories/carts-items";
import { prisma } from "../prisma-service";

export class PrismaCartsItemsRepository implements CartsItemsRepository {
  async create(data: ICartItemsRequest): Promise<void> {
    await prisma.cartItems.create({
      data: {
        cartId: data.cartId,
        productsId: data.product.id,
        quantity: data.quantity,
      },
    });
  }
  async get(
    cartId: string,
    productId: string
  ): Promise<ICartItemsResponse | null> {
    const cartItem = await prisma.cartItems.findFirst({
      where: {
        AND: [{ cartId }, { productsId: productId }],
      },
      select: {
        id: true,
        cartId: true,
        quantity: true,
        product: true,
      },
    });

    if (!cartItem) {
      return null;
    }

    return cartItem;
  }
  async update(
    cartItemsId: string,
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<void> {
    await prisma.cartItems.update({
      where: {
        id: cartItemsId,
        AND: [{ cartId }, { productsId: productId }],
      },
      data: {
        quantity,
      },
    });
  }
  async remove(
    cartItemsId: string,
    cartId: string,
    productId: string
  ): Promise<void> {
    await prisma.cartItems.delete({
      where: {
        id: cartItemsId,
        AND: [{ cartId }, { productsId: productId }],
      },
    });
  }

  async delete(cartId: string): Promise<void> {
    await prisma.cartItems.deleteMany({
      where: { cartId },
    });
  }
}
