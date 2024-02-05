import { makeProductFactory } from "@test/config/factories/make-product-factory";
import { InMemoryProductsRepository } from "@test/config/memory-repositories/in-memory-products-repository";
import { describe, test, expect } from "vitest";
import { productGetOneService } from "./products-get-one";

describe("Test read product", () => {
  const productsRepo = new InMemoryProductsRepository();
  const productFactory = makeProductFactory();
  productsRepo.products.push(productFactory);

  test("should to be able to read a product", async () => {
    const product = await productGetOneService(productFactory.id, productsRepo);

    expect(product).toEqual(
      expect.objectContaining({
        id: productFactory.id,
        title: productFactory.title,
        description: productFactory.description,
        category: productFactory.category,
        image: productFactory.image,
        price: productFactory.price,
      })
    );
  });

  test("should to be able to return nullable if product not fund", async () => {
    const product = await productGetOneService(
      "not-found-product",
      productsRepo
    );

    expect(product).toBe(null);
  });
});
