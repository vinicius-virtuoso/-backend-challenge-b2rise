import { AppError } from "@/app/error";
import { IAdminRequest } from "@/app/interfaces/admins-interfaces";
import { AdminsRepository } from "@/app/repositories/admins-repository";
import { NextFunction, Request, Response } from "express";

export const adminAlreadyExists = (adminsRepository: AdminsRepository) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body as IAdminRequest;
    const user = await adminsRepository.findByUsername(username);

    if (user) {
      throw new AppError("User already exists.", 409);
    }

    return next();
  };
};
