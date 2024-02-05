import { IProductResponse } from "@/app/interfaces/products-interfaces";
import { randomUUID } from "node:crypto";

type Override = Partial<IProductResponse>;
export function makeProductFactory(override: Override = {}) {
  return {
    id: override.id ?? randomUUID(),
    title:
      override.title ??
      "Classic Cotton Comfort: Men's Heather Gray Crewneck T-Shirt" +
        randomUUID(),
    description:
      override.description ??
      "Elevate your everyday style with our Classic Cotton Comfort Men's T-Shirt in Heather Gray. Crafted from soft and breathable cotton, this crewneck tee ensures all-day comfort. The versatile heather gray shade adds a touch of casual sophistication, making it a wardrobe essential. Whether you're heading out for a casual day or layering it for a relaxed evening look, this T-shirt is a timeless choice. Upgrade your wardrobe with the perfect blend of comfort and style.",
    category: override.category ?? "T-shirt",
    image: override.image ?? "https://placehold.co/600x400?text=Product\nImage",
    price: override.price ?? 29.99,
    ...override,
  };
}
