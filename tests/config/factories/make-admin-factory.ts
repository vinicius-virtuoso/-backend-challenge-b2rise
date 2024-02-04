import { IAdminResponse } from "@/app/interfaces/admins-interfaces";
import { randomUUID } from "node:crypto";

type Override = Partial<IAdminResponse>;
export function makeAdminFactory(override: Override = {}) {
  return {
    id: override.id ?? randomUUID(),
    email: "admin-test-01@test.com",
    username: "admin-test-01",
    password: "123456789",
    first_name: "admin",
    last_name: "01",
    ...override,
  };
}
