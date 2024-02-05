import { ICartResponse } from "@/app/interfaces/carts-interfaces";
import { randomUUID } from "node:crypto";

type Override = Partial<ICartResponse>;
export function makeCartFactory(override: Override = {}) {
  const total =
    override.products?.reduce((acc, att) => {
      return acc + att.product.price * att.quantity;
    }, 0) || 0;

  const count =
    override.products?.reduce((acc, att) => {
      return acc + att.quantity;
    }, 0) || 0;

  return {
    id: override.id ?? randomUUID(),
    user_id: override.user_id ?? "usausn-sasabshasas",
    count: override.count ?? count,
    total: override.total ?? total,
    products: override.products ?? [],
    ...override,
  };
}
