import { Users } from "../entities/users-entity";
import { IUserResponse } from "../interfaces/users-interfaces";

export abstract class UsersRepository {
  abstract create(data: Users): Promise<IUserResponse>;
  abstract findByUsername(username: string): Promise<IUserResponse | null>;
  abstract findByUsernameOrEmail(
    email: string,
    username: string
  ): Promise<IUserResponse | null>;
}
