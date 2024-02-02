import { ProductsRepository } from "@/app/repositories/products-repository";
import { productCreateService } from "@/app/services/products/products-create";
import { productDeleteService } from "@/app/services/products/products-delete";
import { productsGetAllService } from "@/app/services/products/products-get-all";
import { productGetOneService } from "@/app/services/products/products-get-one";
import { productUpdateService } from "@/app/services/products/products-update";
import { Request, Response } from "express";

export class ProductsController {
  productsRepository: ProductsRepository;

  constructor(productsRepository: ProductsRepository) {
    this.productsRepository = productsRepository;
  }
  async create(req: Request, res: Response) {
    const product = await productCreateService(
      req.body,
      this.productsRepository
    );
    return res.status(201).json(product);
  }

  async findOne(req: Request, res: Response) {
    const product = await productGetOneService(
      req.params.productId,
      this.productsRepository
    );
    return res.status(200).json(product);
  }

  async findAll(req: Request, res: Response) {
    const products = await productsGetAllService(this.productsRepository);
    return res.status(200).json(products);
  }

  async update(req: Request, res: Response) {
    const product = await productUpdateService(
      req.params.productId,
      req.body,
      this.productsRepository
    );
    return res.status(200).json(product);
  }

  async delete(req: Request, res: Response) {
    await productDeleteService(req.params.productId, this.productsRepository);
    return res.status(204).json();
  }
}
