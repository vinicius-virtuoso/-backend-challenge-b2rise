import {
  InMemoryCartsRepository,
  cartsMemory,
} from "@test/config/memory-repositories/in-memory-carts-repository";
import { describe, test, expect } from "vitest";
import { cartCreateService } from "./cart-create";
import { InMemoryUsersRepository } from "@test/config/memory-repositories/in-memory-users-repository";
import { makeUserFactory } from "@test/config/factories/make-user-factory";

describe("Test create shopping cart", () => {
  test("should to be able create cart", async () => {
    const cartRepo = new InMemoryCartsRepository();
    const usersRepo = new InMemoryUsersRepository();

    const userFactory = makeUserFactory();
    usersRepo.users.push(userFactory);

    await cartCreateService(userFactory.id, cartRepo);

    expect(cartsMemory).toHaveLength(1);
    expect(cartsMemory[0].user_id).toEqual(userFactory.id);
  });
});
