import { describe, test, expect } from "vitest";
import { userCreateService } from "./users-create";
import { makeUserFactory } from "@test/config/factories/make-user-factory";
import { InMemoryUsersRepository } from "@test/config/memory-repositories/in-memory-users-repository";

describe("Test Service Create User", () => {
  test("should not to be return user password", async () => {
    const usersRepo = new InMemoryUsersRepository();
    const data = makeUserFactory();

    const user = await userCreateService(data, usersRepo);

    expect(user).not.toHaveProperty("password");
  });

  test("should to be able create user", async () => {
    const usersRepo = new InMemoryUsersRepository();
    const data = makeUserFactory();

    const user = await userCreateService(data, usersRepo);

    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        username: data.username,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
      })
    );
  });
});
