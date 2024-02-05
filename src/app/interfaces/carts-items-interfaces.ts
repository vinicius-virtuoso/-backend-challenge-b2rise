import { z } from "zod";
import { productSchemaResponse } from "./products-interfaces";

export const cartItemsSchemaRequest = z.object({
  cart_id: z.string().min(1),
  quantity: z.number().default(1),
  product: productSchemaResponse,
});

export const cartItemsSchemaResponse = z.object({
  id: z.string(),
  quantity: z.number(),
  product: productSchemaResponse,
});

export type ICartItemsRequest = z.infer<typeof cartItemsSchemaRequest>;
export type ICartItemsResponse = z.infer<typeof cartItemsSchemaResponse>;
