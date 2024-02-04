import { IAdminRequest } from "@/app/interfaces/admins-interfaces";
import { AdminsRepository } from "@/app/repositories/admins-repository";

export const adminUpdateService = async (
  adminId: string,
  data: Partial<IAdminRequest>,
  adminsRepository: AdminsRepository
) => {
  return await adminsRepository.update(adminId, data);
};
