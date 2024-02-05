import { CartsRepository } from "@/app/repositories/carts-repository";
import { cartCreateService } from "@/app/services/carts/cart-create";
import { NextFunction, Request, Response } from "express";

export const cartBeforeCreate = (cartsRepository: CartsRepository) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.user.id;

    const cart = await cartsRepository.get(user_id);

    if (!cart) {
      await cartCreateService(user_id, cartsRepository);
      return next();
    }

    return next();
  };
};
