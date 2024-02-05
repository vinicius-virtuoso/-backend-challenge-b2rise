import { makeProductFactory } from "@test/config/factories/make-product-factory";
import { describe, test, expect } from "vitest";
import { productCreateService } from "./products-create";
import { InMemoryProductsRepository } from "@test/config/memory-repositories/in-memory-products-repository";
import { productDeleteService } from "./products-delete";

describe("Test delete product", () => {
  test("should to be able to delete a product", async () => {
    const productsRepo = new InMemoryProductsRepository();
    const productFactory = makeProductFactory();
    productsRepo.products.push(productFactory);

    await productDeleteService(productFactory.id, productsRepo);

    expect(productsRepo.products).toHaveLength(0);
  });
});
