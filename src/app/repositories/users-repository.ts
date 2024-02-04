import { Users } from "../entities/users-entity";
import {
  IUserRequest,
  IUserResponse,
  IUserWithPasswordResponse,
} from "../interfaces/users-interfaces";

export abstract class UsersRepository {
  abstract create(data: Users): Promise<IUserResponse>;
  abstract findByUsername(
    username: string
  ): Promise<IUserWithPasswordResponse | null>;
  abstract findByUsernameOrEmail(
    email: string,
    username: string
  ): Promise<IUserResponse | null>;

  abstract findById(id: string): Promise<IUserResponse | null>;

  abstract update(
    userId: string,
    data: Partial<IUserRequest>
  ): Promise<IUserResponse | null>;

  abstract delete(userId: string): Promise<void>;
}
