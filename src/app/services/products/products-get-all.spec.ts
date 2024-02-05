import { makeProductFactory } from "@test/config/factories/make-product-factory";
import { InMemoryProductsRepository } from "@test/config/memory-repositories/in-memory-products-repository";
import { describe, test, expect } from "vitest";
import { productsGetAllService } from "./products-get-all";

describe("Test lista Products", () => {
  const productsRepo = new InMemoryProductsRepository();

  for (let i = 1; i <= 3; i++) {
    let productFactory = makeProductFactory();
    if (i === 2) {
      productFactory = makeProductFactory({
        price: 2.99,
        category: "sticker",
        title:
          "Vibrant Vinyl Decals Set: Assorted Colorful Stickers for Personalization",
      });
    }
    if (i === 3) {
      productFactory = makeProductFactory({
        title:
          "Premium Ceramic Mug Collection: Elegant and Durable Drinkware for Every Sip",
        category: "mugs",
        price: 19.5,
      });
    }
    productsRepo.products.push(productFactory);
  }

  test("should to be able to get all products", async () => {
    const products = await productsGetAllService(
      "/products",
      1,
      1,
      "undefined",
      "undefined",
      1,
      99999,
      productsRepo
    );

    expect(products).toEqual(
      expect.objectContaining({
        page: 1,
        count: 3,
        pagePrevious: null,
        pageNext: expect.any(String),
        products: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            category: expect.any(String),
            image: expect.any(String),
            price: expect.any(Number),
          }),
        ]),
      })
    );
  });

  test("should to be able to get all products using filter category", async () => {
    const products = await productsGetAllService(
      "/products",
      1,
      5,
      "mugs",
      "undefined",
      1,
      99999,
      productsRepo
    );

    expect(products).toEqual(
      expect.objectContaining({
        page: 1,
        count: 1,
        pagePrevious: null,
        pageNext: null,
        products: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            category: "mugs",
            image: expect.any(String),
            price: expect.any(Number),
          }),
        ]),
      })
    );
  });

  test("should to be able to get all products using filter title", async () => {
    const products = await productsGetAllService(
      "/products",
      1,
      5,
      "undefined",
      "Elegant",
      1,
      99999,
      productsRepo
    );

    expect(products).toEqual(
      expect.objectContaining({
        page: 1,
        count: 1,
        pagePrevious: null,
        pageNext: null,
        products: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.stringContaining("Elegant"),
            description: expect.any(String),
            category: expect.any(String),
            image: expect.any(String),
            price: expect.any(Number),
          }),
        ]),
      })
    );
  });
});
