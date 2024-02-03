import { validateBody } from "@/app/middlewares/validate-body";
import { Request, Response, Router } from "express";
import { AdminsController } from "../controllers/admins-controller";
import { adminSchemaRequest } from "@/app/interfaces/admins-interfaces";
import { adminAlreadyExists } from "@/app/middlewares/admins-middleware/admin-already-exists";
import { PrismaAdminsRepository } from "@/infra/database/repositories/prisma-admins-repository";
import { validateToken } from "@/app/security/token/validate-token";
import { adminDuplicatedExists } from "@/app/middlewares/admins-middleware/admin-duplicated-exists";
import { adminNotFound } from "@/app/middlewares/admins-middleware/admin-not-found";

const adminsRepository = new PrismaAdminsRepository();
const adminsController = new AdminsController(adminsRepository);

export const adminsRoutes = Router();

adminsRoutes.get(
  "/profile",
  validateToken,
  adminNotFound(adminsRepository),
  (req: Request, res: Response) => adminsController.findOne(req, res)
);
adminsRoutes.post(
  "/",
  validateBody(adminSchemaRequest),
  adminAlreadyExists(adminsRepository),
  (req: Request, res: Response) => adminsController.create(req, res)
);

adminsRoutes.patch(
  "/profile",
  validateToken,
  adminNotFound(adminsRepository),
  adminDuplicatedExists(adminsRepository),
  (req: Request, res: Response) => adminsController.update(req, res)
);

adminsRoutes.delete(
  "/profile",
  validateToken,
  adminNotFound(adminsRepository),
  (req: Request, res: Response) => adminsController.delete(req, res)
);
