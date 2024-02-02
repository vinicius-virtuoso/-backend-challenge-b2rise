import { ProductsRepository } from "@/app/repositories/products-repository";
import { productCreateService } from "@/app/services/products/products-create";
import { Request, Response } from "express";

export class ProductsController {
  repository: ProductsRepository;

  constructor(repository: ProductsRepository) {
    this.repository = repository;
  }
  async create(req: Request, res: Response) {
    const product = await productCreateService(req.body, this.repository);
    return res.status(201).json(product);
  }

  async findOne(req: Request, res: Response) {
    return res.status(200).json();
  }

  async findAll(req: Request, res: Response) {
    return res.status(200).json();
  }

  async update(req: Request, res: Response) {
    return res.status(200).json();
  }

  async delete(req: Request, res: Response) {
    return res.status(204).json();
  }
}
