import { Users as UsersPrisma } from "@prisma/client";
import { Users as RawUsers } from "@app/entities/users-entity";

import {
  IUserResponse,
  IUserWithPasswordResponse,
  userSchemaRequest,
  userSchemaResponse,
  userSchemaWithPasswordResponse,
} from "@app/interfaces/users-interfaces";

export class PrismaUsersMapper {
  static toPrisma(user: RawUsers) {
    return userSchemaRequest.parse(user);
  }

  static toDomain(raw: UsersPrisma): IUserResponse {
    return userSchemaResponse.parse(raw);
  }

  static toDomainWithPassword(raw: UsersPrisma): IUserWithPasswordResponse {
    return userSchemaWithPasswordResponse.parse(raw);
  }
}
