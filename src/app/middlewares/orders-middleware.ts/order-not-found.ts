import { AppError } from "@/app/error";
import { OrdersRepository } from "@/app/repositories/orders-repository";
import { NextFunction, Request, Response } from "express";

export const orderNotFound = (ordersRepository: OrdersRepository) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const order = await ordersRepository.findById(
      req.user.id,
      req.params.orderId
    );

    // console.log(order);

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    return next();
  };
};
