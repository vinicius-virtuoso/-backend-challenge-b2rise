import { z } from "zod";
import { productSchemaResponse } from "./products-interfaces";

export const cartItemsSchemaRequest = z.object({
  cartId: z.string().min(1),
  quantity: z.number().default(1),
  product: productSchemaResponse,
});

export const cartItemsSchemaResponse = z.object({
  quantity: z.number(),
  product: productSchemaResponse,
});

export type cartItemsRequest = z.infer<typeof cartItemsSchemaRequest>;
export type cartItemsResponse = z.infer<typeof cartItemsSchemaResponse>;
