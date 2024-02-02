import { AppError } from "@/app/error";
import { AdminsRepository } from "@/app/repositories/admins-repository";
import { PrismaAdminsRepository } from "@/infra/database/repositories/prisma-admins-repository";

export const adminDeleteService = async (
  adminId: string,
  adminsRepository: AdminsRepository = new PrismaAdminsRepository()
) => {
  return await adminsRepository.delete(adminId);
};
