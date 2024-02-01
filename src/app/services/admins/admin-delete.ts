import { AppError } from "@/app/error";
import { AdminsRepository } from "@/app/repositories/admins-repository";
import { PrismaAdminsRepository } from "@/infra/database/repositories/prisma-admins-repository";

export const adminDeleteService = async (
  userId: string,
  usersRepository: AdminsRepository = new PrismaAdminsRepository()
) => {
  const user = await usersRepository.findById(userId);
  if (!user) {
    throw new AppError("User not found.", 404);
  }

  return await usersRepository.delete(userId);
};
