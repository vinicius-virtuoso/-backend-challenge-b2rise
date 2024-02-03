import { CartsRepository } from "@/app/repositories/carts-repository";
import { OrdersItemsRepository } from "@/app/repositories/orders-items.repository";
import { OrdersRepository } from "@/app/repositories/orders-repository";
import { orderCreateService } from "@/app/services/orders/order-create";
import { ordersGetAllService } from "@/app/services/orders/orders-get-all";
import { ordersGetOneService } from "@/app/services/orders/orders-get-one";
import { Request, Response } from "express";

export class OrdersController {
  constructor(
    private cartsRepository: CartsRepository,
    private ordersRepository: OrdersRepository,
    private ordersItemsRepository: OrdersItemsRepository
  ) {}
  async create(req: Request, res: Response) {
    const order = await orderCreateService(
      req.user.id,
      this.cartsRepository,
      this.ordersRepository,
      this.ordersItemsRepository
    );
    return res.status(201).json(order);
  }

  async findOne(req: Request, res: Response) {
    const order = await ordersGetOneService(
      req.user.id,
      req.params.orderId,
      this.ordersRepository
    );

    return res.status(200).json(order);
  }

  async findAll(req: Request, res: Response) {
    const orders = await ordersGetAllService(
      req.user.id,
      this.ordersRepository
    );
    return res.status(200).json(orders);
  }

  async update(req: Request, res: Response) {
    return res.status(200).json();
  }

  async delete(req: Request, res: Response) {
    return res.status(204).json();
  }
}
