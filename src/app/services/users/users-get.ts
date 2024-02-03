import { UsersRepository } from "@/app/repositories/users-repository";

export const userGetService = async (
  userId: string,
  usersRepository: UsersRepository
) => {
  return await usersRepository.findById(userId);
};
