import { Router } from "express";
import { authSchemaRequest } from "@/app/interfaces/auth-interfaces";
import { validateBody } from "@/app/middlewares/validate-body";

import { PrismaAdminsRepository } from "@/infra/database/repositories/prisma-admins-repository";
import { AuthAdminController } from "../controllers/auth-admins-controller";

const adminsRepository = new PrismaAdminsRepository();
const authController = new AuthAdminController(adminsRepository);

export const authAdminRoutes = Router();

authAdminRoutes.post(
  "/",
  validateBody(authSchemaRequest),
  authController.execute
);
