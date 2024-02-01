import { Admins as AdminsPrisma } from "@prisma/client";
import { Admins as RawAdmins } from "@app/entities/admins-entity";
import {
  IAdminResponse,
  IAdminWithPasswordResponse,
} from "@/app/interfaces/admins-interfaces";

export class PrismaAdminsMapper {
  static toPrisma(user: RawAdmins) {
    return {
      username: user.username,
      password: user.password,
    };
  }

  static toDomain(raw: AdminsPrisma): IAdminResponse {
    return {
      id: raw.id,
      username: raw.username,
    };
  }

  static toDomainWithPassword(raw: AdminsPrisma): IAdminWithPasswordResponse {
    return {
      ...this.toDomain(raw),
      password: raw.password,
    };
  }
}
