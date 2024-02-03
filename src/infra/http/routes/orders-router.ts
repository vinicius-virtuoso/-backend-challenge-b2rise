import { cartNotFound } from "@/app/middlewares/carts-middlewares/cart-not-found";
import { userNotFound } from "@/app/middlewares/users-middleware/user-not-found";
import { validateToken } from "@/app/security/token/validate-token";
import { PrismaCartsRepository } from "@/infra/database/repositories/prisma-carts-repository";
import { PrismaOrdersItemsRepository } from "@/infra/database/repositories/prisma-orders-items-repository";
import { PrismaOrdersRepository } from "@/infra/database/repositories/prisma-orders-repository";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";
import { Request, Response, Router } from "express";
import { OrdersController } from "../controllers/orders-controller";
import { cartIsEmpty } from "@/app/middlewares/checkout-middleware.ts/cart-is-empty";

const usersRepository = new PrismaUsersRepository();
const cartsRepository = new PrismaCartsRepository();
const ordersRepository = new PrismaOrdersRepository();
const ordersItemsRepository = new PrismaOrdersItemsRepository();

const orderController = new OrdersController(
  cartsRepository,
  ordersRepository,
  ordersItemsRepository
);

export const ordersRoutes = Router();

ordersRoutes.post(
  "/",
  validateToken,
  userNotFound(usersRepository),
  cartIsEmpty(cartsRepository),
  (req: Request, res: Response) => orderController.create(req, res)
);
