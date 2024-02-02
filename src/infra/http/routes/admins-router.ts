import { validateBody } from "@/app/middlewares/validate-body";
import { Router } from "express";
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
  adminsController.findOne
);
adminsRoutes.post(
  "/",
  validateBody(adminSchemaRequest),
  adminAlreadyExists(adminsRepository),
  adminsController.create
);

adminsRoutes.patch(
  "/profile",
  validateToken,
  adminNotFound(adminsRepository),
  adminDuplicatedExists(adminsRepository),
  adminsController.update
);

adminsRoutes.delete(
  "/profile",
  validateToken,
  adminNotFound(adminsRepository),
  adminsController.delete
);
