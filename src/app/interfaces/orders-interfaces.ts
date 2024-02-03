import { z } from "zod";
import { productSchemaResponse } from "./products-interfaces";

export const orderSchemaRequest = z.object({
  userId: z.string().min(1),
});

export const orderSchemaResponse = z.object({
  id: z.string(),
  user_id: z.string(),
  date: z.date(),
  products: z.array(
    z.object({
      quantity: z.number(),
      product: productSchemaResponse,
    })
  ),
});

export const ordersListSchemaResponse = z.array(orderSchemaResponse);

export type IOrderRequest = z.infer<typeof orderSchemaRequest>;
export type IOrderResponse = z.infer<typeof orderSchemaResponse>;
export type IOrdersListResponse = z.infer<typeof ordersListSchemaResponse>;
