import { PrismaProductsRepository } from "@/infra/database/repositories/prisma-products-repository";
import { Request, Response, Router } from "express";
import { ProductsController } from "../controllers/products-controller";
import { validateBody } from "@/app/middlewares/validate-body";
import { productSchemaRequest } from "@/app/interfaces/products-interfaces";
import { validateToken } from "@/app/security/token/validate-token";
import { isAdmin } from "@/app/middlewares/admins-middleware/is-admin";
import { productAlreadyExists } from "@/app/middlewares/products-middleware/products-already-exists";
import { productNotFound } from "@/app/middlewares/products-middleware/products-not-found";
import { productDuplicatedExists } from "@/app/middlewares/products-middleware/products-duplicated-exists";

const productsRepository = new PrismaProductsRepository();
const productController = new ProductsController(productsRepository);

export const productsRoutes = Router();

productsRoutes.get("/", (req: Request, res: Response) =>
  productController.findAll(req, res)
);

productsRoutes.post(
  "/",
  validateToken,
  isAdmin,
  validateBody(productSchemaRequest),
  productAlreadyExists(productsRepository),
  (req: Request, res: Response) => productController.create(req, res)
);

productsRoutes.get(
  "/:productId",
  productNotFound(productsRepository),
  (req: Request, res: Response) => productController.findOne(req, res)
);

productsRoutes.get(
  "/category/:categoryProduct",
  (req: Request, res: Response) => productController.findByCategory(req, res)
);

productsRoutes.patch(
  "/:productId",
  validateToken,
  isAdmin,
  productNotFound(productsRepository),
  productDuplicatedExists(productsRepository),
  (req: Request, res: Response) => productController.update(req, res)
);

productsRoutes.delete(
  "/:productId",
  validateToken,
  isAdmin,
  productNotFound(productsRepository),
  (req: Request, res: Response) => productController.delete(req, res)
);
