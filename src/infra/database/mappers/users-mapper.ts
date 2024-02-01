import { Users as UsersPrisma } from "@prisma/client";
import { Users as RawUsers } from "@app/entities/users-entity";

import {
  IUserResponse,
  IUserWithPasswordResponse,
} from "@app/interfaces/users-interfaces";

export class PrismaUsersMapper {
  static toPrisma(user: Omit<RawUsers, "id">) {
    const result = {
      email: user.email,
      username: user.username,
      password: user.password,
      first_name: user.first_name,
      last_name: user.last_name,
    };

    return result;
  }

  static toDomain(raw: UsersPrisma): IUserResponse {
    return {
      id: raw.id,
      email: raw.email,
      username: raw.username,
      first_name: raw.first_name,
      last_name: raw.last_name,
    };
  }

  static toDomainWithPassword(raw: UsersPrisma): IUserWithPasswordResponse {
    return {
      ...this.toDomain(raw),
      password: raw.password,
    };
  }
}
