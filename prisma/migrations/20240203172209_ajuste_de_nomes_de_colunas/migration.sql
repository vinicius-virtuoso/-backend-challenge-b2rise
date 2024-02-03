/*
  Warnings:

  - You are about to drop the column `purchaseOrdersId` on the `purchase-order-items` table. All the data in the column will be lost.
  - Added the required column `purchase_order_id` to the `purchase-order-items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "purchase-order-items" DROP CONSTRAINT "purchase-order-items_purchaseOrdersId_fkey";

-- AlterTable
ALTER TABLE "purchase-order-items" DROP COLUMN "purchaseOrdersId",
ADD COLUMN     "purchase_order_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "purchase-order-items" ADD CONSTRAINT "purchase-order-items_purchase_order_id_fkey" FOREIGN KEY ("purchase_order_id") REFERENCES "purchase_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
