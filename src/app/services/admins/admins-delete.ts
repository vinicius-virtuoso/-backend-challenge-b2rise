import { AdminsRepository } from "@/app/repositories/admins-repository";

export const adminDeleteService = async (
  adminId: string,
  adminsRepository: AdminsRepository
) => {
  return await adminsRepository.delete(adminId);
};
