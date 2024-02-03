import { AdminsRepository } from "@/app/repositories/admins-repository";

export const adminGetService = async (
  adminId: string,
  adminsRepository: AdminsRepository
) => {
  return await adminsRepository.findById(adminId);
};
