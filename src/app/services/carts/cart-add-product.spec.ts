import { makeCartFactory } from "@test/config/factories/make-cart-factory";
import { makeCartItemFactory } from "@test/config/factories/make-cart-items-factory";
import { makeProductFactory } from "@test/config/factories/make-product-factory";
import { makeUserFactory } from "@test/config/factories/make-user-factory";
import { InMemoryCartsItemsRepository } from "@test/config/memory-repositories/in-memory-carts-items-repository";
import { InMemoryCartsRepository } from "@test/config/memory-repositories/in-memory-carts-repository";
import { InMemoryUsersRepository } from "@test/config/memory-repositories/in-memory-users-repository";
import { describe, test, expect } from "vitest";
import { cartAddProduct } from "./cart-add-product";
import { InMemoryProductsRepository } from "@test/config/memory-repositories/in-memory-products-repository";

describe("Test add product in cart", () => {
  test("should to be able to increment quantity product in cart", async () => {
    const cartsRepo = new InMemoryCartsRepository();
    const usersRepo = new InMemoryUsersRepository();
    const cartItemsRepo = new InMemoryCartsItemsRepository();
    const productsRepo = new InMemoryProductsRepository();

    const userFactory = makeUserFactory();
    const cartFactory = makeCartFactory({ user_id: userFactory.id });
    const productFactory = makeProductFactory();
    const cartItemFactory = makeCartItemFactory({
      cart_id: cartFactory.id,
      product: productFactory,
    });

    usersRepo.users.push(userFactory);
    productsRepo.products.push(productFactory);
    cartsRepo.carts.push(cartFactory);
    cartItemsRepo.cart_items.push(cartItemFactory);

    const cart = await cartAddProduct(
      userFactory.id,
      productFactory.id,
      cartsRepo,
      productsRepo,
      cartItemsRepo
    );

    expect(cart).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        count: 2,
        total: productFactory.price * 2,
        user_id: userFactory.id,
        products: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            quantity: 2,
            cart_id: expect.any(String),
            product: expect.objectContaining({
              id: expect.any(String),
              title: expect.any(String),
              description: expect.any(String),
              category: expect.any(String),
              price: expect.any(Number),
              image: expect.any(String),
            }),
          }),
        ]),
      })
    );
  });

  test("should to be able to add new product in cart", async () => {
    const cartsRepo = new InMemoryCartsRepository();
    const usersRepo = new InMemoryUsersRepository();
    const cartItemsRepo = new InMemoryCartsItemsRepository();
    const productsRepo = new InMemoryProductsRepository();

    const userFactory = makeUserFactory();
    const cartFactory = makeCartFactory({ user_id: userFactory.id });
    const productFactory = makeProductFactory();

    usersRepo.users.push(userFactory);
    productsRepo.products.push(productFactory);
    cartsRepo.carts.push(cartFactory);

    const cart = await cartAddProduct(
      userFactory.id,
      productFactory.id,
      cartsRepo,
      productsRepo,
      cartItemsRepo
    );

    expect(cart).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        count: 1,
        total: productFactory.price,
        user_id: userFactory.id,
        products: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            quantity: 1,
            cart_id: expect.any(String),
            product: expect.objectContaining({
              id: expect.any(String),
              title: expect.any(String),
              description: expect.any(String),
              category: expect.any(String),
              price: expect.any(Number),
              image: expect.any(String),
            }),
          }),
        ]),
      })
    );
  });
});
