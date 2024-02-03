/*
  Warnings:

  - You are about to drop the column `products_id` on the `carts-items` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `carts-items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "carts-items" DROP CONSTRAINT "carts-items_products_id_fkey";

-- AlterTable
ALTER TABLE "carts-items" DROP COLUMN "products_id",
ADD COLUMN     "product_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "carts-items" ADD CONSTRAINT "carts-items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
