import { AppError } from "@/app/error";
import { IProductRequest } from "@/app/interfaces/products-interfaces";
import { ProductsRepository } from "@/app/repositories/products-repository";
import { NextFunction, Request, Response } from "express";

export const productAlreadyExists = (
  productsRepository: ProductsRepository
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { title } = req.body as IProductRequest;
    const product = await productsRepository.findByTitle(title);

    if (product) {
      throw new AppError("Product already exists.", 409);
    }

    return next();
  };
};
