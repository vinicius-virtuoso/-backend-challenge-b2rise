import { makeCartFactory } from "@test/config/factories/make-cart-factory";
import { makeCartItemFactory } from "@test/config/factories/make-cart-items-factory";
import { makeUserFactory } from "@test/config/factories/make-user-factory";
import { InMemoryCartsItemsRepository } from "@test/config/memory-repositories/in-memory-carts-items-repository";
import { InMemoryCartsRepository } from "@test/config/memory-repositories/in-memory-carts-repository";
import { InMemoryUsersRepository } from "@test/config/memory-repositories/in-memory-users-repository";
import { describe, test, expect } from "vitest";
import { cartRemoveProductService } from "./cart-remove-product";

describe("Test Cart remove one Product", () => {
  const cartsRepo = new InMemoryCartsRepository();
  const usersRepo = new InMemoryUsersRepository();
  const cartItemsRepo = new InMemoryCartsItemsRepository();

  const userFactory = makeUserFactory();
  const cartFactory = makeCartFactory({ user_id: userFactory.id });
  let items = [];
  for (let i = 0; i <= 4; i++) {
    items.push(makeCartItemFactory({ cart_id: cartFactory.id }));
  }

  usersRepo.users.push(userFactory);
  cartsRepo.carts.push(cartFactory);
  cartItemsRepo.cart_items.push(...items);

  test("should to be able remove one product for cart", async () => {
    const cart = await cartRemoveProductService(
      userFactory.id,
      items[2].product.id,
      cartsRepo,
      cartItemsRepo
    );

    expect(cart?.products).toHaveLength(items.length - 1);
  });
});
