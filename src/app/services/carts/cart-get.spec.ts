import { describe, test, expect } from "vitest";
import { makeCartFactory } from "@test/config/factories/make-cart-factory";
import { makeCartItemFactory } from "@test/config/factories/make-cart-items-factory";
import { makeUserFactory } from "@test/config/factories/make-user-factory";
import { InMemoryCartsItemsRepository } from "@test/config/memory-repositories/in-memory-carts-items-repository";
import { InMemoryCartsRepository } from "@test/config/memory-repositories/in-memory-carts-repository";
import { InMemoryUsersRepository } from "@test/config/memory-repositories/in-memory-users-repository";
import { cartGetService } from "./cart-get";

describe("Test read Cart", () => {
  const cartsRepo = new InMemoryCartsRepository();
  const usersRepo = new InMemoryUsersRepository();
  const cartItemsRepo = new InMemoryCartsItemsRepository();

  const userFactory = makeUserFactory();
  const cartFactory = makeCartFactory({ user_id: userFactory.id });
  const cartItemFactory = makeCartItemFactory({ cart_id: cartFactory.id });

  usersRepo.users.push(userFactory);
  cartsRepo.carts.push(cartFactory);
  cartItemsRepo.cart_items.push(cartItemFactory);

  test("should not to be read cart when user not exists cart and to returned nullable", async () => {
    const cart = await cartGetService("fake-user", cartsRepo);
    expect(cart).toBeNull();
  });

  test("should to be able to read cart for user", async () => {
    const cart = await cartGetService(userFactory.id, cartsRepo);

    expect(cart).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        count: expect.any(Number),
        total: expect.any(Number),
        user_id: expect.any(String),
        products: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            quantity: expect.any(Number),
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
