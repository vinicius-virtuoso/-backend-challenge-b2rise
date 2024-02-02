import { AppError } from "@/app/error";
import { ProductsRepository } from "@/app/repositories/products-repository";
import { NextFunction, Request, Response } from "express";

export const productNotFound = (productsRepository: ProductsRepository) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;

    const product = await productsRepository.findById(productId);

    if (!product) {
      throw new AppError("Product not found.", 404);
    }

    return next();
  };
};
