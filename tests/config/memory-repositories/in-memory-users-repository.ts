import { Users } from "@/app/entities/users-entity";
import { IUserResponse } from "@/app/interfaces/users-interfaces";
import { UsersRepository } from "@/app/repositories/users-repository";
import { TestUsersMapper } from "../mappers/users-mapper";

export class InMemoryUsersRepository implements UsersRepository {
  users: IUserResponse[] = [];

  async create(data: Users): Promise<IUserResponse> {
    this.users.push(TestUsersMapper.toDatabase(data));
    return TestUsersMapper.toDomain(data);
  }
  findByUsername(username: string): Promise<{
    id: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    password: string;
  } | null> {
    throw new Error("Method not implemented.");
  }
  findByUsernameOrEmail(
    email: string,
    username: string
  ): Promise<{
    id: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
  } | null> {
    throw new Error("Method not implemented.");
  }
  async findById(id: string): Promise<IUserResponse | null> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return null;
    }
    return TestUsersMapper.toDomain(user);
  }
  update(
    userId: string,
    data: Partial<{
      email: string;
      username: string;
      first_name: string;
      last_name: string;
      password: string;
    }>
  ): Promise<{
    id: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
  }> {
    throw new Error("Method not implemented.");
  }
  async delete(userId: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== userId);
  }
}
