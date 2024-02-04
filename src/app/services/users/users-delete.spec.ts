import { describe, test, expect } from "vitest";
import { makeUserFactory } from "@test/config/factories/make-user-factory";
import { InMemoryUsersRepository } from "@test/config/memory-repositories/in-memory-users-repository";
import { userDeleteService } from "./users-delete";

describe("Test Service Delete User", () => {
  test("should to be able to delete user", async () => {
    const usersRepo = new InMemoryUsersRepository();
    const data = makeUserFactory();
    usersRepo.users.push(data);

    await userDeleteService(data.id, usersRepo);

    expect(usersRepo.users).toHaveLength(0);
  });
});
