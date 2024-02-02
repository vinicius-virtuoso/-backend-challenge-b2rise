import { AppError } from "@/app/error";
import { UsersRepository } from "@/app/repositories/users-repository";
import { NextFunction, Request, Response } from "express";

export const userNotFound = (usersRepository: UsersRepository) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.user.id;

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    return next();
  };
};
