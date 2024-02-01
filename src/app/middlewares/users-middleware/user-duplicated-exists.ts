import { AppError } from "@/app/error";
import { IUserRequest } from "@/app/interfaces/users-interfaces";
import { UsersRepository } from "@/app/repositories/users-repository";
import { NextFunction, Request, Response } from "express";

export const userDuplicatedExists = (usersRepository: UsersRepository) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { email, username } = req.body as IUserRequest;

    if (email || username) {
      const user = await usersRepository.findByUsernameOrEmail(email, username);

      if (user && user.id !== req.user.id) {
        throw new AppError("User already exists.", 409);
      }
    }
    return next();
  };
};
