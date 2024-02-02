import { AppError } from "@/app/error";
import { AdminsRepository } from "@/app/repositories/admins-repository";
import { NextFunction, Request, Response } from "express";

export const adminNotFound = (usersRepository: AdminsRepository) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const admin_id = req.user.id;

    const admin = await usersRepository.findById(admin_id);

    if (!admin) {
      throw new AppError("User not found.", 404);
    }

    return next();
  };
};
