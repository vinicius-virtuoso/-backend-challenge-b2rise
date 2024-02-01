import { AppError } from "@/app/error";
import { IAdminRequest } from "@/app/interfaces/admins-interfaces";
import { AdminsRepository } from "@/app/repositories/admins-repository";
import { NextFunction, Request, Response } from "express";

export const adminDuplicatedExists = (usersRepository: AdminsRepository) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body as IAdminRequest;

    if (!req.user.is_admin) {
      throw new AppError("You not have permission to access", 403);
    }

    if (username) {
      const user = await usersRepository.findByUsername(username);

      if (user && user.id !== req.user.id) {
        throw new AppError("User already exists.", 409);
      }
    }

    return next();
  };
};
