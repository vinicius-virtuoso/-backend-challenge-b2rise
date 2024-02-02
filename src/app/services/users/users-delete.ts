import { UsersRepository } from "@/app/repositories/users-repository";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";

export const userDeleteService = async (
  userId: string,
  usersRepository: UsersRepository = new PrismaUsersRepository()
) => {
  return await usersRepository.delete(userId);
};
