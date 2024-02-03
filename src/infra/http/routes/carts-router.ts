import { PrismaCartsRepository } from "@/infra/database/repositories/prisma-carts-repository";
import { Request, Response, Router } from "express";
import { CartsController } from "../controllers/carts-controller";
import { PrismaCartsItemsRepository } from "@/infra/database/repositories/prisma-carts-items-repository";
import { PrismaProductsRepository } from "@/infra/database/repositories/prisma-products-repository";
import { validateToken } from "@/app/security/token/validate-token";
import { userNotFound } from "@/app/middlewares/users-middleware/user-not-found";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";
import { productNotFound } from "@/app/middlewares/products-middleware/products-not-found";
import { cartBeforeCreate } from "@/app/middlewares/carts-middlewares/cart-before-create";
import { cartNotFound } from "@/app/middlewares/carts-middlewares/cart-not-found";
import { cartProductNotFound } from "@/app/middlewares/carts-middlewares/cart-product-not-found";

export const cartsRoutes = Router();

const usersRepository = new PrismaUsersRepository();
const cartsRepository = new PrismaCartsRepository();
const productsRepository = new PrismaProductsRepository();
const cartsItemsRepository = new PrismaCartsItemsRepository();
const cartsController = new CartsController(
  cartsRepository,
  productsRepository,
  cartsItemsRepository
);

cartsRoutes.get(
  "/",
  validateToken,
  userNotFound(usersRepository),
  cartBeforeCreate(cartsRepository),
  (req: Request, res: Response) => cartsController.findOne(req, res)
);

cartsRoutes.post(
  "/add/:productId",
  validateToken,
  userNotFound(usersRepository),
  productNotFound(productsRepository),
  cartBeforeCreate(cartsRepository),
  (req: Request, res: Response) => cartsController.addProduct(req, res)
);

cartsRoutes.patch(
  "/sub/:productId",
  validateToken,
  userNotFound(usersRepository),
  cartNotFound(cartsRepository),
  cartProductNotFound(cartsRepository, cartsItemsRepository),
  (req: Request, res: Response) => cartsController.subProduct(req, res)
);

cartsRoutes.delete(
  "/remove/:productId",
  validateToken,
  userNotFound(usersRepository),
  cartNotFound(cartsRepository),
  cartProductNotFound(cartsRepository, cartsItemsRepository),
  (req: Request, res: Response) => cartsController.removeProduct(req, res)
);

cartsRoutes.delete(
  "/all/remove",
  validateToken,
  userNotFound(usersRepository),
  cartNotFound(cartsRepository),
  (req: Request, res: Response) => cartsController.removeProductAll(req, res)
);
