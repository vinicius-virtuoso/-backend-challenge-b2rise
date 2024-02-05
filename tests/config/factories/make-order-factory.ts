import { randomUUID } from "node:crypto";
import { IOrderResponse } from "@/app/interfaces/orders-interfaces";
import { makeProductFactory } from "./make-product-factory";

type Override = Partial<IOrderResponse>;
export function makeOrderFactory(override: Override = {}) {
  return {
    id: override.id ?? randomUUID(),
    user_id: override.user_id ?? "not-found-user",
    products: override.products ?? [
      { quantity: 4, product: makeProductFactory() },
    ],
    date: override.date ?? new Date(),
    ...override,
  };
}
