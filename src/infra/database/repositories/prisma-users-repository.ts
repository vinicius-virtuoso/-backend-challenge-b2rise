import { Users } from "@/app/entities/users-entity";
import { IUserResponse } from "@/app/interfaces/users-interfaces";
import { UsersRepository } from "@/app/repositories/users-repository";

import { prisma } from "../prisma-service";
import { PrismaUsersMapper } from "../mappers/users-mapper";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Users): Promise<IUserResponse> {
    console.log(data);

    const user = await prisma.users.create({
      data: {
        email: data.email,
        username: data.username,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
      },
    });

    return PrismaUsersMapper.toDomain(user);
  }
  async findByUsername(username: string): Promise<IUserResponse | null> {
    const user = await prisma.users.findFirst({
      where: { username },
    });
    return user ? PrismaUsersMapper.toDomainWithPassword(user) : null;
  }

  async findByUsernameOrEmail(
    email: string,
    username: string
  ): Promise<IUserResponse | null> {
    const user = await prisma.users.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    return user ? PrismaUsersMapper.toDomain(user) : null;
  }
}
