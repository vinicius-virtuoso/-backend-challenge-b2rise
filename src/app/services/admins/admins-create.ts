import { Admins } from "@/app/entities/admins-entity";
import { IAdminRequest } from "@/app/interfaces/admins-interfaces";
import { AdminsRepository } from "@/app/repositories/admins-repository";
import { PrismaAdminsRepository } from "@/infra/database/repositories/prisma-admins-repository";

export const adminCreateService = async (
  data: IAdminRequest,
  adminsRepository: AdminsRepository = new PrismaAdminsRepository()
) => {
  const admin = new Admins(data);
  return await adminsRepository.create(admin);
};
