import { IUserResponse } from "@/app/interfaces/users-interfaces";
import { randomUUID } from "node:crypto";

type Override = Partial<IUserResponse>;
export function makeUserFactory(override: Override = {}) {
  return {
    id: override.id ?? randomUUID(),
    email: "user-test-01@test.com",
    username: "user-test-01",
    password: "123456789",
    first_name: "user",
    last_name: "01",
    ...override,
  };
}
