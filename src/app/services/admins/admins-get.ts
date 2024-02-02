import { AdminsRepository } from "@/app/repositories/admins-repository";
import { PrismaAdminsRepository } from "@/infra/database/repositories/prisma-admins-repository";

export const adminGetService = async (
  adminId: string,
  adminsRepository: AdminsRepository = new PrismaAdminsRepository()
) => {
  return await adminsRepository.findById(adminId);
};
