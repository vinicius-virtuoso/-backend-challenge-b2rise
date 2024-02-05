import { makeProductFactory } from "@test/config/factories/make-product-factory";
import { InMemoryProductsRepository } from "@test/config/memory-repositories/in-memory-products-repository";
import { describe, expect, test } from "vitest";
import { productUpdateService } from "./products-update";

describe("Test update product", () => {
  const productsRepo = new InMemoryProductsRepository();
  const productFactory = makeProductFactory();
  productsRepo.products.push(productFactory);

  test("should to be able to update a product", async () => {
    const updatedProduct = await productUpdateService(
      productFactory.id,
      { title: "Test product updated" },
      productsRepo
    );

    expect(updatedProduct).toEqual(
      expect.objectContaining({
        id: productFactory.id,
        title: "Test product updated",
        description: productFactory.description,
        category: productFactory.category,
        image: productFactory.image,
        price: productFactory.price,
      })
    );
  });

  test("should to be able to return nullable if not found product", async () => {
    const updatedProduct = await productUpdateService(
      "not-found-product",
      { title: "Test product updated" },
      productsRepo
    );

    expect(updatedProduct).toBe(null);
  });
});
