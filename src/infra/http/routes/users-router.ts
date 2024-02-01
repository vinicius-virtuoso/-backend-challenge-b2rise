import { Router } from "express";
import { UsersController } from "../controllers/users-controller";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";
import { userAlreadyExists } from "@/app/middlewares/users-middleware/user-already-exists";

const usersRepository = new PrismaUsersRepository();
const usersController = new UsersController(usersRepository);

export const usersRoutes = Router();

usersRoutes.post(
  "/",
  userAlreadyExists(usersRepository),
  usersController.create
);
