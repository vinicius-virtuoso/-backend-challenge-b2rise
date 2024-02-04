import { describe, test, expect } from "vitest";
import { makeAdminFactory } from "@test/config/factories/make-admin-factory";
import { InMemoryAdminsRepository } from "@test/config/memory-repositories/in-memory-admins-repository";
import { adminUpdateService } from "./admin-update";

describe("Test Service Update profile Admin", () => {
  test("should to be able to update profile of user", async () => {
    const adminsRepo = new InMemoryAdminsRepository();
    const data = makeAdminFactory();
    adminsRepo.admins.push(data);

    const admin = await adminUpdateService(
      data.id,
      { username: "test-admin-updated" },
      adminsRepo
    );

    expect(admin).toEqual(
      expect.objectContaining({
        username: "test-admin-updated",
      })
    );
  });
});
