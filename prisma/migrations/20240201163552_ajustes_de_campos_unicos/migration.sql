/*
  Warnings:

  - You are about to alter the column `password` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(50)`.
  - A unique constraint covering the columns `[title]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE VARCHAR(50);

-- CreateIndex
CREATE UNIQUE INDEX "products_title_key" ON "products"("title");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
