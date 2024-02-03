import { IOrderResponse } from "@/app/interfaces/orders-interfaces";
import { OrdersRepository } from "@/app/repositories/orders-repository";
import { prisma } from "../prisma-service";

export class PrismaOrdersRepository implements OrdersRepository {
  async create(
    userId: string
  ): Promise<Omit<IOrderResponse, "count" | "total"> | null> {
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
  async findById(orderId: string): Promise<IOrderResponse | null> {
    throw new Error("Method not implemented.");
  }
  async getAll(userId: string): Promise<IOrderResponse[]> {
    throw new Error("Method not implemented.");
  }
  async delete(orderId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
