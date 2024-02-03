import { OrdersItemsRepository } from "@/app/repositories/orders-items.repository";
import { prisma } from "../prisma-service";

export class PrismaOrdersItemsRepository implements OrdersItemsRepository {
  async create(
    orderId: string,
    productId: string,
    price: number,
    quantity: number
  ): Promise<any> {
    const orderItem = await prisma.purchaseOrderItems.create({
      data: {
        purchase_order_id: orderId,
        product_id: productId,
        price,
        quantity,
      },

      select: {
        purchaseOrder: {
          select: {
            id: true,
            user_id: true,
            date: true,
          },
        },
        quantity: true,
        price: true,
        product: {
          select: {
            id: true,
            title: true,
            description: true,
            image: true,
          },
        },
      },
    });
    return orderItem;
  }
}
