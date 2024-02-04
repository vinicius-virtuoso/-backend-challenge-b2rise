import { makeAdminFactory } from "@test/config/factories/make-admin-factory";
import { InMemoryAdminsRepository } from "@test/config/memory-repositories/in-memory-admins-repository";
import { describe, test, expect } from "vitest";
import { adminCreateService } from "./admins-create";

describe("Test Service Create Admin", () => {
  test("should not to be return admin password", async () => {
    const usersRepo = new InMemoryAdminsRepository();
    const data = makeAdminFactory();

    const admin = await adminCreateService(data, usersRepo);

    expect(admin).not.toHaveProperty("password");
  });

  test("should to be able create user", async () => {
    const usersRepo = new InMemoryAdminsRepository();
    const data = makeAdminFactory();

    const admin = await adminCreateService(data, usersRepo);

    expect(admin).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        username: data.username,
      })
    );
  });
});
