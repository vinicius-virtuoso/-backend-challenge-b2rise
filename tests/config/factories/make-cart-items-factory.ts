import { ICartItemsResponse } from "@/app/interfaces/carts-items-interfaces";
import { randomUUID } from "node:crypto";
import { makeProductFactory } from "./make-product-factory";

type Override = Partial<ICartItemsResponse & { cart_id: string }>;
export function makeCartItemFactory(override: Override = {}) {
  return {
    id: override.id ?? randomUUID(),
    quantity: override.quantity ?? 1,
    product: override.product ?? makeProductFactory(),
    cart_id: override.cart_id ?? randomUUID(),
    ...override,
  };
}
