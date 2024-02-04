import { describe, test, expect } from "vitest";
import { makeUserFactory } from "@test/config/factories/make-user-factory";
import { InMemoryUsersRepository } from "@test/config/memory-repositories/in-memory-users-repository";

import { userUpdateService } from "./users-update";

describe("Test Service Update profile User", () => {
  test("should to be able to update profile of user", async () => {
    const usersRepo = new InMemoryUsersRepository();
    const data = makeUserFactory();
    usersRepo.users.push(data);

    const user = await userUpdateService(
      data.id,
      { username: "test-updated", email: "test-updated@example.com" },
      usersRepo
    );

    expect(user).toEqual(
      expect.objectContaining({
        username: "test-updated",
        email: "test-updated@example.com",
      })
    );
  });
});
