import { Users } from "@/app/entities/users-entity";
import {
  IUserResponse,
  IUserWithPasswordResponse,
} from "@/app/interfaces/users-interfaces";

export class TestUsersMapper {
  static toDatabase(data: Users) {
    return {
      id: data.id,
      username: data.username,
      email: data.email,
      password: data.password,
      first_name: data.first_name,
      last_name: data.last_name,
    };
  }

  static toDomain(data: IUserResponse) {
    return {
      id: data.id,
      username: data.username,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
    };
  }

  static toDomainWithPassword(data: IUserWithPasswordResponse) {
    return {
      id: data.id,
      username: data.username,
      email: data.email,
      password: data.password,
      first_name: data.first_name,
      last_name: data.last_name,
    };
  }
}
