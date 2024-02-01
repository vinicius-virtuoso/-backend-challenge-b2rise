import { AppError } from "@/app/error";
import { IAdminRequest } from "@/app/interfaces/admins-interfaces";
import { UsersRepository } from "@/app/repositories/users-repository";
import { NextFunction, Request, Response } from "express";

export const adminDuplicatedExists = (usersRepository: UsersRepository) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body as IAdminRequest;

    if (username) {
      const user = await usersRepository.findByUsername(username);

      if (user && user.id !== req.user.id) {
        throw new AppError("User already exists.", 409);
      }
    }
    return next();
  };
};
