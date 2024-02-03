import { AppError } from "@/app/error";
import { IProductRequest } from "@/app/interfaces/products-interfaces";
import { CartsRepository } from "@/app/repositories/carts-repository";
import { NextFunction, Request, Response } from "express";

export const cartIsEmpty = (cartsRepository: CartsRepository) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;

    const cart = await cartsRepository.get(id);

    if (cart) {
      if (cart.products.length <= 0) {
        throw new AppError("Your shopping cart is empty.", 403);
      }
    }

    return next();
  };
};
