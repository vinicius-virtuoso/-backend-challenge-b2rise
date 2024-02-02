import { IAdminRequest } from "@/app/interfaces/admins-interfaces";
import { AdminsRepository } from "@/app/repositories/admins-repository";
import { PrismaAdminsRepository } from "@/infra/database/repositories/prisma-admins-repository";

export const adminUpdateService = async (
  adminId: string,
  data: Partial<IAdminRequest>,
  adminsRepository: AdminsRepository = new PrismaAdminsRepository()
) => {
  return await adminsRepository.update(adminId, data);
};
