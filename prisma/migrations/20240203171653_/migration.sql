/*
  Warnings:

  - You are about to drop the column `userId` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `cartId` on the `carts-items` table. All the data in the column will be lost.
  - You are about to drop the column `productsId` on the `carts-items` table. All the data in the column will be lost.
  - You are about to drop the column `productsId` on the `purchase-order-items` table. All the data in the column will be lost.
  - You are about to drop the column `usersId` on the `purchase_orders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `carts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `car_id` to the `carts-items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `products_id` to the `carts-items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `purchase-order-items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `purchase_orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_userId_fkey";

-- DropForeignKey
ALTER TABLE "carts-items" DROP CONSTRAINT "carts-items_cartId_fkey";

-- DropForeignKey
ALTER TABLE "carts-items" DROP CONSTRAINT "carts-items_productsId_fkey";

-- DropForeignKey
ALTER TABLE "purchase-order-items" DROP CONSTRAINT "purchase-order-items_productsId_fkey";

-- DropForeignKey
ALTER TABLE "purchase_orders" DROP CONSTRAINT "purchase_orders_usersId_fkey";

-- DropIndex
DROP INDEX "carts_userId_key";

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "carts-items" DROP COLUMN "cartId",
DROP COLUMN "productsId",
ADD COLUMN     "car_id" TEXT NOT NULL,
ADD COLUMN     "products_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "purchase-order-items" DROP COLUMN "productsId",
ADD COLUMN     "product_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "purchase_orders" DROP COLUMN "usersId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "carts_user_id_key" ON "carts"("user_id");

-- AddForeignKey
ALTER TABLE "purchase_orders" ADD CONSTRAINT "purchase_orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase-order-items" ADD CONSTRAINT "purchase-order-items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts-items" ADD CONSTRAINT "carts-items_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts-items" ADD CONSTRAINT "carts-items_products_id_fkey" FOREIGN KEY ("products_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
