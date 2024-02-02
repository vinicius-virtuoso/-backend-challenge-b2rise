import { Users } from "@/app/entities/users-entity";
import { IUserRequest, IUserResponse } from "@/app/interfaces/users-interfaces";
import { UsersRepository } from "@/app/repositories/users-repository";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";
// import { hash } from "bcryptjs";

export const userCreateService = async (
  data: IUserRequest,
  usersRepository: UsersRepository = new PrismaUsersRepository()
) => {
  const { password } = data;

  // const passwordHashed = await hash(password, 12);
  const user = new Users({ ...data, password });

  const result = await usersRepository.create(user);
  return result;
};
