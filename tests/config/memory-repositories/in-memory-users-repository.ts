import { Users } from "@/app/entities/users-entity";
import {
  IUserRequest,
  IUserResponse,
  IUserWithPasswordResponse,
} from "@/app/interfaces/users-interfaces";
import { UsersRepository } from "@/app/repositories/users-repository";
import { TestUsersMapper } from "../mappers/users-mapper";

export class InMemoryUsersRepository implements UsersRepository {
  users: IUserWithPasswordResponse[] = [];

  async create(data: Users): Promise<IUserResponse> {
    this.users.push(TestUsersMapper.toDatabase(data));
    return TestUsersMapper.toDomain(data);
  }
  async findByUsername(
    username: string
  ): Promise<IUserWithPasswordResponse | null> {
    const user = this.users.find((user) => user.username === username);
    if (!user) {
      return null;
    }
    return TestUsersMapper.toDomainWithPassword(user);
  }
  async findByUsernameOrEmail(
    email: string,
    username: string
  ): Promise<IUserResponse | null> {
    const user = this.users.find(
      (user) => user.username === username || user.email === email
    );
    if (!user) {
      return null;
    }
    return TestUsersMapper.toDomain(user);
  }
  async findById(id: string): Promise<IUserResponse | null> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return null;
    }
    return TestUsersMapper.toDomain(user);
  }
  async update(
    userId: string,
    data: Partial<IUserRequest>
  ): Promise<IUserResponse | null> {
    const user = this.users.find((user) => user.id === userId);

    if (!user) {
      return null;
    }

    user.username = data.username ?? user.username;
    user.email = data.email ?? user.email;
    user.first_name = data.first_name ?? user.first_name;
    user.last_name = data.last_name ?? user.last_name;
    user.password = data.password ?? user.password;

    return TestUsersMapper.toDomain(user);
  }
  async delete(userId: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== userId);
  }
}
