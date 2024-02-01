import { Router } from "express";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";
import { AuthController } from "../controllers/auth-controller";
import { authSchemaRequest } from "@/app/interfaces/auth-interfaces";
import { validateBody } from "@/app/middlewares/validate-body";

const usersRepository = new PrismaUsersRepository();
const authController = new AuthController(usersRepository);

export const authRoutes = Router();

authRoutes.post("/", validateBody(authSchemaRequest), authController.execute);
