import { AppError } from "@/app/error";
import { CartsItemsRepository } from "@/app/repositories/carts-items";

import { CartsRepository } from "@/app/repositories/carts-repository";
import { NextFunction, Request, Response } from "express";

export const cartProductNotFound = (
  cartsRepository: CartsRepository,
  cartsItemsRepository: CartsItemsRepository
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id: user_id } = req.user;
    const { productId } = req.params;
    const cart = await cartsRepository.get(user_id);

    if (cart) {
      const cartItem = await cartsItemsRepository.get(cart.id, productId);

      if (!cartItem) {
        throw new AppError("You don't have the product in your cart.", 404);
      }
    }

    return next();
  };
};
