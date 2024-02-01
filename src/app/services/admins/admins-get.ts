import { AppError } from "@/app/error";
import { IAdminResponse } from "@/app/interfaces/admins-interfaces";
import { AdminsRepository } from "@/app/repositories/admins-repository";
import { PrismaAdminsRepository } from "@/infra/database/repositories/prisma-admins-repository";

export const adminGetService = async (
  userId: string,
  usersRepository: AdminsRepository = new PrismaAdminsRepository()
): Promise<IAdminResponse> => {
  const user = await usersRepository.findById(userId);
  if (!user) {
    throw new AppError("User not found.", 404);
  }
  return user;
};
