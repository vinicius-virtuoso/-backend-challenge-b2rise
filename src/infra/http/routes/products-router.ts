import { PrismaProductsRepository } from "@/infra/database/repositories/prisma-products-repository";
import { Router } from "express";
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

productsRoutes.get("/", productController.findAll);

productsRoutes.post(
  "/",
  validateBody(productSchemaRequest),
  validateToken,
  isAdmin,
  productAlreadyExists(productsRepository),
  productController.create
);

productsRoutes.get(
  "/:productId",
  productNotFound(productsRepository),
  productController.findOne
);

productsRoutes.patch(
  "/:productId",
  validateToken,
  isAdmin,
  productNotFound(productsRepository),
  productDuplicatedExists(productsRepository),
  productController.update
);

productsRoutes.delete(
  "/:productId",
  validateToken,
  isAdmin,
  productNotFound(productsRepository),
  productController.delete
);
