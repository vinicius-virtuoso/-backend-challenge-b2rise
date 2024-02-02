import { Admins as AdminsPrisma } from "@prisma/client";
import { Admins as RawAdmins } from "@app/entities/admins-entity";
import {
  IAdminResponse,
  IAdminWithPasswordResponse,
  adminSchemaRequest,
  adminSchemaResponse,
  adminSchemaWithPasswordResponse,
} from "@/app/interfaces/admins-interfaces";

export class PrismaAdminsMapper {
  static toPrisma(user: RawAdmins) {
    return adminSchemaRequest.parse(user);
  }

  static toDomain(raw: AdminsPrisma): IAdminResponse {
    return adminSchemaResponse.parse(raw);
  }

  static toDomainWithPassword(raw: AdminsPrisma): IAdminWithPasswordResponse {
    return adminSchemaWithPasswordResponse.parse(raw);
  }
}
