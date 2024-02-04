import { Users } from "@/app/entities/users-entity";
import { IUserRequest } from "@/app/interfaces/users-interfaces";

type Override = Partial<IUserRequest>;
export function makeUserFactory(override: Override = {}) {
  return {
    email: "user-test-01@test.com",
    username: "user-test-01",
    password: "123456789",
    first_name: "user",
    last_name: "01",
    ...override,
  };
}
