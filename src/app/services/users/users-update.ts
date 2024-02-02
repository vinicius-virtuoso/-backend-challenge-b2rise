import { IUserRequest } from "@/app/interfaces/users-interfaces";
import { UsersRepository } from "@/app/repositories/users-repository";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";

export const userUpdateService = async (
  userId: string,
  data: Partial<IUserRequest>,
  usersRepository: UsersRepository = new PrismaUsersRepository()
) => {
  return await usersRepository.update(userId, data);
};
