import { describe, test, expect } from "vitest";
import { makeUserFactory } from "@test/config/factories/make-user-factory";
import { InMemoryUsersRepository } from "@test/config/memory-repositories/in-memory-users-repository";
import { userGetService } from "./users-get";

describe("Test Service Read profile User", () => {
  test("should not to be return user password", async () => {
    const usersRepo = new InMemoryUsersRepository();
    const data = makeUserFactory();
    usersRepo.users.push(data);

    const user = await userGetService(data.id, usersRepo);

    expect(user).not.toHaveProperty("password");
  });

  test("should to be able to view profile of user", async () => {
    const usersRepo = new InMemoryUsersRepository();
    const data = makeUserFactory();
    usersRepo.users.push(data);

    const user = await userGetService(data.id, usersRepo);

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
