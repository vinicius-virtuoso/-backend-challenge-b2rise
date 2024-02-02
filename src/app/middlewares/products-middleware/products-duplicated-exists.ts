import { AppError } from "@/app/error";
import { IProductRequest } from "@/app/interfaces/products-interfaces";
import { ProductsRepository } from "@/app/repositories/products-repository";
import { NextFunction, Request, Response } from "express";

export const productDuplicatedExists = (
  productsRepository: ProductsRepository
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { title } = req.body as IProductRequest;
    const { productId } = req.params;

    if (title) {
      const product = await productsRepository.findByTitle(title);

      if (product && product.id !== productId) {
        throw new AppError("Product already exists.", 409);
      }
    }
    return next();
  };
};
