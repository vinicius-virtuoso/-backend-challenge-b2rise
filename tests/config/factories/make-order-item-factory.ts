import { randomUUID } from "node:crypto";
import { makeProductFactory } from "./make-product-factory";

type Override = Partial<{
  id: string;
  order_id: string;
  product: {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    price?: any;
  };
  price: number;
  quantity: number;
}>;
export function makeOrderItemFactory(override: Override = {}) {
  return {
    id: override.id ?? randomUUID(),
    order_id: override.order_id ?? randomUUID(),
    product: makeProductFactory(),
    price: override.price ?? 29.99,
    quantity: override.quantity ?? 1,
    ...override,
  };
}
