import { Admins } from "@/app/entities/admins-entity";
import {
  IAdminResponse,
  IAdminWithPasswordResponse,
} from "@/app/interfaces/admins-interfaces";

export class TestAdminsMapper {
  static toDatabase(data: Admins) {
    return {
      id: data.id,
      username: data.username,
      password: data.password,
    };
  }

  static toDomain(data: IAdminResponse) {
    return {
      id: data.id,
      username: data.username,
    };
  }

  static toDomainWithPassword(data: IAdminWithPasswordResponse) {
    return {
      id: data.id,
      username: data.username,
      password: data.password,
    };
  }
}
