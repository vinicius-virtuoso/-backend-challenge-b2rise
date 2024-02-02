import { z } from "zod";
import { cartItemsSchemaResponse } from "./carts-items-interfaces";

export const cartSchemaRequest = z.object({
  userId: z.string().min(1),
});

export const cartSchemaResponse = z.object({
  id: z.string(),
  userId: z.string(),
  count: z.number(),
  total: z.number().or(z.any()),
  products: z.array(cartItemsSchemaResponse),
});

export type ICartRequest = z.infer<typeof cartSchemaRequest>;
export type ICartResponse = z.infer<typeof cartSchemaResponse>;
