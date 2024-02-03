import { cartNotFound } from "@/app/middlewares/carts-middlewares/cart-not-found";
import { userNotFound } from "@/app/middlewares/users-middleware/user-not-found";
import { validateToken } from "@/app/security/token/validate-token";
import { PrismaCartsRepository } from "@/infra/database/repositories/prisma-carts-repository";
import { PrismaOrdersItemsRepository } from "@/infra/database/repositories/prisma-orders-items-repository";
import { PrismaOrdersRepository } from "@/infra/database/repositories/prisma-orders-repository";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";
import { Request, Response, Router } from "express";
import { OrdersController } from "../controllers/orders-controller";

const usersRepository = new PrismaUsersRepository();
const cartsRepository = new PrismaCartsRepository();

const ordersRepository = new PrismaOrdersRepository();
const ordersItemsRepository = new PrismaOrdersItemsRepository();

const orderController = new OrdersController(
  cartsRepository,
  ordersRepository,
  ordersItemsRepository
);

export const checkoutRoutes = Router();

checkoutRoutes.post(
  "/cart",
  validateToken,
  userNotFound(usersRepository),
  cartIsEmpty(cartsRepository),
  (req: Request, res: Response) => orderController.create(req, res)
);
