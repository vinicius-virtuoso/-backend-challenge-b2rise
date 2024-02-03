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

  async getAll(userId: string): Promise<IOrderResponse[]> {
    const orders = await prisma.purchaseOrders.findMany({
      where: { user_id: userId },
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

    if (orders.length <= 0) {
      return [];
    }

    return orders.map((order) => {
      return {
        id: order.id,
        user_id: order.user_id,
        date: order.date,
        products: order.PurchaseOrderItems,
      };
    });
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
