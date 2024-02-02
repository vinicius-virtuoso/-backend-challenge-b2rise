import { AdminsRepository } from "@/app/repositories/admins-repository";
import { PrismaAdminsRepository } from "@/infra/database/repositories/prisma-admins-repository";

export const adminGetService = async (
  userId: string,
  usersRepository: AdminsRepository = new PrismaAdminsRepository()
) => {
  return await usersRepository.findById(userId);
};
