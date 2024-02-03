import { AppError } from "@/app/error";

import { CartsRepository } from "@/app/repositories/carts-repository";
import { NextFunction, Request, Response } from "express";

export const cartNotFound = (cartsRepository: CartsRepository) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.user.id;

    const cart = await cartsRepository.get(user_id);

    if (!cart) {
      throw new AppError("Cart not found.", 404);
    }

    return next();
  };
};
