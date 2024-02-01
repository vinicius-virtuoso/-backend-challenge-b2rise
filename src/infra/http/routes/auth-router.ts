import { Router } from "express";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";

import { authSchemaRequest } from "@/app/interfaces/auth-interfaces";
import { validateBody } from "@/app/middlewares/validate-body";
import { AuthController } from "@/infra/database/mappers/auth-controller";

const usersRepository = new PrismaUsersRepository();
const authController = new AuthController(usersRepository);

export const authRoutes = Router();

authRoutes.post("/", validateBody(authSchemaRequest), authController.execute);
authRoutes.post(
  "/admin",
  validateBody(authSchemaRequest),
  authController.execute_admin
);
