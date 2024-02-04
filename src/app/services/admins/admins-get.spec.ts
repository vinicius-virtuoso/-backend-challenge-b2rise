import { describe, test, expect } from "vitest";
import { adminGetService } from "./admins-get";
import { makeAdminFactory } from "@test/config/factories/make-admin-factory";
import { InMemoryAdminsRepository } from "@test/config/memory-repositories/in-memory-admins-repository";

describe("Test Service Read profile Admin", () => {
  test("should not to be return admin password", async () => {
    const adminsRepo = new InMemoryAdminsRepository();
    const data = makeAdminFactory();
    adminsRepo.admins.push(data);

    const user = await adminGetService(data.id, adminsRepo);

    expect(user).not.toHaveProperty("password");
  });

  test("should to be able to view profile of admin", async () => {
    const adminsRepo = new InMemoryAdminsRepository();
    const data = makeAdminFactory();
    adminsRepo.admins.push(data);

    const user = await adminGetService(data.id, adminsRepo);

    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        username: data.username,
      })
    );
  });
});
