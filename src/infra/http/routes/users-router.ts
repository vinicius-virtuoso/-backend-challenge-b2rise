import { Router } from "express";
import { usersController } from "../controllers/users-controller";

export const usersRoutes = Router();

usersRoutes.post("/", usersController.create);
