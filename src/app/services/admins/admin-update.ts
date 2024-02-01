import { IAdminRequest } from "@/app/interfaces/admins-interfaces";
import { AdminsRepository } from "@/app/repositories/admins-repository";
import { PrismaAdminsRepository } from "@/infra/database/repositories/prisma-admins-repository";

export const adminUpdateService = async (
  userId: string,
  data: Partial<IAdminRequest>,
  usersRepository: AdminsRepository = new PrismaAdminsRepository()
) => {
  return await usersRepository.update(userId, data);
};
