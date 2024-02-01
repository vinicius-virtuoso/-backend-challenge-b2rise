import { Admins } from "@app/entities/admins-entity";
import {
  IAdminRequest,
  IAdminResponse,
  IAdminWithPasswordResponse,
} from "../interfaces/admins-interfaces";

export abstract class AdminsRepository {
  abstract create(data: Admins): Promise<IAdminResponse>;
  abstract findByUsername(
    username: string
  ): Promise<IAdminWithPasswordResponse | null>;

  abstract findById(id: string): Promise<IAdminResponse | null>;

  abstract update(
    userId: string,
    data: Partial<IAdminRequest>
  ): Promise<IAdminResponse>;

  abstract delete(userId: string): Promise<void>;
}
