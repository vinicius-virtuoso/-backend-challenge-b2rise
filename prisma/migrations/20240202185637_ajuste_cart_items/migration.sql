/*
  Warnings:

  - You are about to drop the column `productId` on the `carts-items` table. All the data in the column will be lost.
  - Added the required column `productsId` to the `carts-items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "carts-items" DROP CONSTRAINT "carts-items_productId_fkey";

-- AlterTable
ALTER TABLE "carts-items" DROP COLUMN "productId",
ADD COLUMN     "productsId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "carts-items" ADD CONSTRAINT "carts-items_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
