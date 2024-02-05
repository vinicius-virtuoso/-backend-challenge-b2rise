import { describe, test, expect } from "vitest";
import { InMemoryCartsRepository } from "@test/config/memory-repositories/in-memory-carts-repository";
import { InMemoryUsersRepository } from "@test/config/memory-repositories/in-memory-users-repository";
import { cartCreateService } from "./cart-create";
import { makeUserFactory } from "@test/config/factories/make-user-factory";

describe("Test create shopping cart", () => {
  test("should to be able create cart", async () => {
    const cartRepo = new InMemoryCartsRepository();
    const usersRepo = new InMemoryUsersRepository();

    const userFactory = makeUserFactory();
    usersRepo.users.push(userFactory);

    await cartCreateService(userFactory.id, cartRepo);

    expect(cartRepo.carts).toHaveLength(1);
    expect(cartRepo.carts[0].user_id).toEqual(userFactory.id);
  });
});
