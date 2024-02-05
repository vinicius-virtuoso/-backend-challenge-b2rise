import { makeCartFactory } from "@test/config/factories/make-cart-factory";
import { makeCartItemFactory } from "@test/config/factories/make-cart-items-factory";
import { makeUserFactory } from "@test/config/factories/make-user-factory";
import { InMemoryCartsItemsRepository } from "@test/config/memory-repositories/in-memory-carts-items-repository";
import { InMemoryCartsRepository } from "@test/config/memory-repositories/in-memory-carts-repository";
import { InMemoryUsersRepository } from "@test/config/memory-repositories/in-memory-users-repository";
import { describe, test, expect } from "vitest";
import { cartRemoveAllService } from "./cart-remove-all";

describe("Test Cart remove all Products", () => {
  const cartsRepo = new InMemoryCartsRepository();
  const usersRepo = new InMemoryUsersRepository();
  const cartItemsRepo = new InMemoryCartsItemsRepository();

  const userFactory = makeUserFactory();
  const cartFactory = makeCartFactory({ user_id: userFactory.id });
  let items = [];
  for (let i = 0; i <= 10; i++) {
    items.push(makeCartItemFactory({ cart_id: cartFactory.id }));
  }

  usersRepo.users.push(userFactory);
  cartsRepo.carts.push(cartFactory);
  cartItemsRepo.cart_items.push(...items);

  test("should to be able remove all products for cart", async () => {
    const cart = await cartRemoveAllService(
      userFactory.id,
      cartsRepo,
      cartItemsRepo
    );

    expect(cart).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        user_id: userFactory.id,
        count: 0,
        total: 0,
        products: [],
      })
    );
  });
});
