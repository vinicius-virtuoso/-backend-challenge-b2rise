import { AppError } from "@/app/error";
import { IUserResponse } from "@/app/interfaces/users-interfaces";
import { UsersRepository } from "@/app/repositories/users-repository";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";

export const userGetService = async (
  userId: string,
  usersRepository: UsersRepository = new PrismaUsersRepository()
): Promise<IUserResponse> => {
  const user = await usersRepository.findById(userId);
  if (!user) {
    throw new AppError("User not found.");
  }
  return user;
};
