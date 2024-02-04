import { describe, test, expect } from "vitest";
import { adminDeleteService } from "./admins-delete";
import { makeAdminFactory } from "@test/config/factories/make-admin-factory";
import { InMemoryAdminsRepository } from "@test/config/memory-repositories/in-memory-admins-repository";

describe("Test Service Delete User", () => {
  test("should to be able to delete user", async () => {
    const adminsRepo = new InMemoryAdminsRepository();
    const data = makeAdminFactory();
    adminsRepo.admins.push(data);

    await adminDeleteService(data.id, adminsRepo);

    expect(adminsRepo.admins).toHaveLength(0);
  });
});
