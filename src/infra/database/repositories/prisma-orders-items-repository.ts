import { OrdersItemsRepository } from "@/app/repositories/orders-items.repository";
import { prisma } from "../prisma-service";

export class PrismaOrdersItemsRepository implements OrdersItemsRepository {
  async create(
    orderId: string,
    productId: string,
    price: number
  ): Promise<void> {
    await prisma.purchaseOrderItems.create({
      data: {
        purchase_order_id: orderId,
        product_id: productId,
        price: price,
      },
    });
  }
}
