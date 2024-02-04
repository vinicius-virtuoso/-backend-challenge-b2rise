import { IOrderResponse } from "@/app/interfaces/orders-interfaces";
import { OrdersRepository } from "@/app/repositories/orders-repository";
import { prisma } from "../prisma-service";

export class PrismaOrdersRepository implements OrdersRepository {
  async findById(
    userId: string,
    orderId: string
  ): Promise<IOrderResponse | null> {
    const order = await prisma.purchaseOrders.findFirst({
      where: { AND: [{ id: orderId }, { user_id: userId }] },
      select: {
        id: true,
        user_id: true,
        date: true,
        PurchaseOrderItems: {
          select: {
            quantity: true,
            product: true,
          },
        },
      },
    });

    if (!order) {
      return null;
    }

    return {
      id: order.id,
      user_id: order.user_id,
      date: order.date,
      products: order.PurchaseOrderItems,
    };
  }
  async create(userId: string): Promise<IOrderResponse | null> {
    const order = await prisma.purchaseOrders.create({
      data: {
        user_id: userId,
      },
      select: {
        id: true,
        user_id: true,
        date: true,
        PurchaseOrderItems: {
          select: {
            quantity: true,
            product: true,
          },
        },
      },
    });

    return {
      id: order.id,
      user_id: order.user_id,
      date: order.date,
      products: order.PurchaseOrderItems,
    };
  }

  async getAll(
    page: number,
    take: number,
    userId: string
  ): Promise<[IOrderResponse[], number]> {
    userId = "";
    const [orders, total] = await prisma.$transaction([
      prisma.purchaseOrders.findMany({
        where: {
          AND: [
            userId
              ? {
                  user_id: userId,
                }
              : {
                  user_id: {
                    not: "",
                  },
                },
          ],
        },
        select: {
          id: true,
          user_id: true,
          date: true,
          PurchaseOrderItems: {
            select: {
              quantity: true,
              product: true,
            },
          },
        },

        skip: (page - 1) * take,
        take,
        orderBy: {
          date: "desc",
        },
      }),
      prisma.purchaseOrders.count({
        where: {
          AND: [
            userId
              ? {
                  user_id: userId,
                }
              : {
                  user_id: {
                    not: "",
                  },
                },
          ],
        },
      }),
    ]);

    return [
      orders.map((order) => {
        return {
          id: order.id,
          user_id: order.user_id,
          date: order.date,
          products: order.PurchaseOrderItems,
        };
      }),
      total,
    ];
  }
  async delete(userId: string, orderId: string): Promise<void> {
    await prisma.purchaseOrders.delete({
      where: {
        id: orderId,
        user_id: userId,
      },
    });
  }
}
