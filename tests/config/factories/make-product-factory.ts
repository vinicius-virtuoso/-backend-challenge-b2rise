import { IProductResponse } from "@/app/interfaces/products-interfaces";
import { randomUUID } from "node:crypto";

type Override = Partial<IProductResponse>;
export function makeProductFactory(override: Override = {}) {
  return {
    id: override.id ?? randomUUID(),
    title: override.title ?? "Clothing Product" + randomUUID(),
    description: override.description ?? "Description of the clothing product.",
    category: override.category ?? "Clothing",
    image: override.image ?? "https://placehold.co/600x400?text=Product\nImage",
    price: override.price ?? 29.99,
    ...override,
  };
}
