import { CartsItemsRepository } from "@/app/repositories/carts-items";
import { CartsRepository } from "@/app/repositories/carts-repository";
import { ProductsRepository } from "@/app/repositories/products-repository";
import { cartAddProduct } from "@/app/services/carts/cart-add-product";
import { cartDecrementProductService } from "@/app/services/carts/cart-decrement-product";
import { cartGetService } from "@/app/services/carts/cart-get";
import { cartRemoveAllService } from "@/app/services/carts/cart-remove-all";
import { cartRemoveProductService } from "@/app/services/carts/cart-remove-product";
import { Request, Response } from "express";

export class CartsController {
  constructor(
    private cartsRepository: CartsRepository,
    private productsRepository: ProductsRepository,
    private cartItemsRepository: CartsItemsRepository
  ) {}

  async findOne(req: Request, res: Response) {
    const cart = await cartGetService(req.user.id, this.cartsRepository);
    return res.status(200).json(cart);
  }

  async addProduct(req: Request, res: Response) {
    const cart = await cartAddProduct(
      req.user.id,
      req.params.productId,
      this.cartsRepository,
      this.productsRepository,
      this.cartItemsRepository
    );
    return res.status(200).json(cart);
  }

  async subProduct(req: Request, res: Response) {
    const cart = await cartDecrementProductService(
      req.user.id,
      req.params.productId,
      this.cartsRepository,
      this.cartItemsRepository
    );
    return res.status(200).json(cart);
  }

  async removeProduct(req: Request, res: Response) {
    const cart = await cartRemoveProductService(
      req.user.id,
      req.params.productId,
      this.cartsRepository,
      this.cartItemsRepository
    );
    return res.status(200).json(cart);
  }

  async removeProductAll(req: Request, res: Response) {
    const cart = await cartRemoveAllService(
      req.user.id,
      this.cartsRepository,
      this.cartItemsRepository
    );
    return res.status(200).json(cart);
  }
}
