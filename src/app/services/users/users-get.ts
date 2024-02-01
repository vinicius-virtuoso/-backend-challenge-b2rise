import { Users } from "@/app/entities/users-entity";
import { AppError } from "@/app/error";
import { IUserRequest, IUserResponse } from "@/app/interfaces/users-interfaces";
import { UsersRepository } from "@/app/repositories/users-repository";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";

export const userGetService = async (
  userId: string,
  usersRepository: UsersRepository = new PrismaUsersRepository()
): Promise<IUserResponse> => {
  console.log(userId);
  const user = await usersRepository.findById(userId);
  if (!user) {
    throw new AppError("User not found.");
  }
  return user;
};
