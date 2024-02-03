import { Request, Response, Router } from "express";
import { UsersController } from "../controllers/users-controller";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";
import { userAlreadyExists } from "@/app/middlewares/users-middleware/user-already-exists";
import { userSchemaRequest } from "@/app/interfaces/users-interfaces";
import { validateBody } from "@/app/middlewares/validate-body";
import { validateToken } from "@/app/security/token/validate-token";
import { userDuplicatedExists } from "@/app/middlewares/users-middleware/user-duplicated-exists";
import { userNotFound } from "@/app/middlewares/users-middleware/user-not-found";

const usersRepository = new PrismaUsersRepository();
const usersController = new UsersController(usersRepository);

export const usersRoutes = Router();

usersRoutes.get(
  "/profile",
  validateToken,
  userNotFound(usersRepository),
  (req: Request, res: Response) => usersController.findOne(req, res)
);

usersRoutes.post(
  "/",
  validateBody(userSchemaRequest),
  userAlreadyExists(usersRepository),
  (req: Request, res: Response) => usersController.create(req, res)
);
usersRoutes.patch(
  "/profile",
  validateToken,
  userNotFound(usersRepository),
  userDuplicatedExists(usersRepository),
  (req: Request, res: Response) => usersController.update(req, res)
);

usersRoutes.delete(
  "/profile",
  validateToken,
  userNotFound(usersRepository),
  (req: Request, res: Response) => usersController.delete(req, res)
);
