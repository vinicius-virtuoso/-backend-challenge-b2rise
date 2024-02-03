import { UsersRepository } from "@/app/repositories/users-repository";

export const userDeleteService = async (
  userId: string,
  usersRepository: UsersRepository
) => {
  return await usersRepository.delete(userId);
};
