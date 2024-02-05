import { ICartResponse } from "./../../../app/interfaces/carts-interfaces";
import { Carts } from "@/app/entities/carts-entity";
import { CartsRepository } from "@/app/repositories/carts-repository";
import { prisma } from "../prisma-service";

export class PrismaCartsRepository implements CartsRepository {
  async create(data: Carts): Promise<ICartResponse> {
    return await prisma.carts.create({
      data: {
        count: 0,
        total: 0,
        user_id: data.user_id,
      },
      include: {
        products: {
          select: {
            id: true,
            product: true,
            quantity: true,
          },
        },
      },
    });
  }
  async get(user_id: string): Promise<ICartResponse | null> {
    const cart = await prisma.carts.findFirst({
      where: { user_id },
      include: {
        products: {
          select: {
            id: true,
            product: true,
            quantity: true,
          },
        },
      },
    });

    if (!cart) {
      return null;
    }

    return cart;
  }

  async update(
    cartId: string,
    data: { count: number; total: number }
  ): Promise<ICartResponse | null> {
    return await prisma.carts.update({
      where: { id: cartId },
      data,
      include: {
        products: {
          select: {
            id: true,
            product: true,
            quantity: true,
          },
        },
      },
    });
  }
}
