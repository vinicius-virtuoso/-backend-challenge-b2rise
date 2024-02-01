import { Router } from "express";
import { UsersController } from "../controllers/users-controller";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";
import { userAlreadyExists } from "@/app/middlewares/users-middleware/user-already-exists";
import { userSchemaRequest } from "@/app/interfaces/users-interfaces";
import { validateBody } from "@/app/middlewares/validate-body";
import { validateToken } from "@/app/security/token/validate-token";
import { userDuplicatedExists } from "@/app/middlewares/users-middleware/user-duplicated-exists";

const usersRepository = new PrismaUsersRepository();
const usersController = new UsersController(usersRepository);

export const usersRoutes = Router();

usersRoutes.post(
  "/",
  validateBody(userSchemaRequest),
  userAlreadyExists(usersRepository),
  usersController.create
);

usersRoutes.get("/profile", validateToken, usersController.findOne);

usersRoutes.patch(
  "/profile",
  validateToken,
  userDuplicatedExists(usersRepository),
  usersController.update
);
