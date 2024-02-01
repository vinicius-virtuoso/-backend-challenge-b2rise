-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(30) NOT NULL,
    "price" DECIMAL(11,2) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "image" VARCHAR(200) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_orders" (
    "id" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "purchase_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase-order-items" (
    "id" TEXT NOT NULL,
    "productsId" TEXT NOT NULL,
    "purchaseOrdersId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "price" DECIMAL(15,2) NOT NULL DEFAULT 0.0,

    CONSTRAINT "purchase-order-items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "purchase_orders" ADD CONSTRAINT "purchase_orders_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase-order-items" ADD CONSTRAINT "purchase-order-items_purchaseOrdersId_fkey" FOREIGN KEY ("purchaseOrdersId") REFERENCES "purchase_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase-order-items" ADD CONSTRAINT "purchase-order-items_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
