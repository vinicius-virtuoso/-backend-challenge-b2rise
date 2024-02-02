import { AppError } from "@/app/error";
import { NextFunction, Request, Response } from "express";

export const isAdmin = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const isAdmin = req.user.is_admin;

    if (isAdmin === false) {
      throw new AppError("You not have permission to access", 403);
    }

    return next();
  };
};
