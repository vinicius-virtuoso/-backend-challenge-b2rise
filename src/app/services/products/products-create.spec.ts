import { makeProductFactory } from "@test/config/factories/make-product-factory";
import { describe, test, expect } from "vitest";
import { productCreateService } from "./products-create";
import { InMemoryProductsRepository } from "@test/config/memory-repositories/in-memory-products-repository";

describe("Test create product", () => {
  test("should to be able to create a product", async () => {
    const productsRepo = new InMemoryProductsRepository();
    const productFactory = makeProductFactory();
    const product = await productCreateService(productFactory, productsRepo);

    expect(product).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: productFactory.title,
        description: productFactory.description,
        category: productFactory.category,
        image: productFactory.image,
        price: productFactory.price,
      })
    );
  });
});
