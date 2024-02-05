import { makeProductFactory } from "@test/config/factories/make-product-factory";
import { describe, test, expect } from "vitest";
import { InMemoryProductsRepository } from "@test/config/memory-repositories/in-memory-products-repository";
import { productsByCategory } from "./products-by-category";

describe("Test product category", () => {
  test("should to be able to return products array empty if category not found", async () => {
    const productsRepo = new InMemoryProductsRepository();

    const productsCategory = await productsByCategory(
      "/products",
      "category-fake",
      2,
      1,
      productsRepo
    );
    expect(productsCategory).toEqual(
      expect.objectContaining({
        page: 1,
        count: 0,
        products: [],
      })
    );
  });

  test("should to be able to list all products of category", async () => {
    const productsRepo = new InMemoryProductsRepository();

    for (let i = 0; i < 10; i++) {
      if (i % 2 === 0) {
        const productFactory = makeProductFactory();
        productsRepo.products.push(productFactory);
      }
      const productFactory = makeProductFactory({
        category: "sticker",
        title:
          "Vibrant Vinyl Decals Set: Assorted Colorful Stickers for Personalization",
      });
      productsRepo.products.push(productFactory);
    }

    const productsCategory = await productsByCategory(
      "/products",
      "sticker",
      2,
      1,
      productsRepo
    );

    expect(productsCategory).toEqual(
      expect.objectContaining({
        page: expect.any(Number),
        count: expect.any(Number),
        products: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            category: "sticker",
            image: expect.any(String),
            price: expect.any(Number),
          }),
        ]),
      })
    );
  });
});
