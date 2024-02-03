/*
  Warnings:

  - You are about to drop the column `car_id` on the `carts-items` table. All the data in the column will be lost.
  - Added the required column `cart_id` to the `carts-items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "carts-items" DROP CONSTRAINT "carts-items_car_id_fkey";

-- AlterTable
ALTER TABLE "carts-items" DROP COLUMN "car_id",
ADD COLUMN     "cart_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "carts-items" ADD CONSTRAINT "carts-items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
