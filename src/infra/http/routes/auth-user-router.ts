import { Router } from "express";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";

import { authSchemaRequest } from "@/app/interfaces/auth-interfaces";
import { validateBody } from "@/app/middlewares/validate-body";
import { AuthUserController } from "../controllers/auth-users-controller";

const usersRepository = new PrismaUsersRepository();
const authController = new AuthUserController(usersRepository);

export const authUserRoutes = Router();

authUserRoutes.post(
  "/",
  validateBody(authSchemaRequest),
  authController.execute
);
