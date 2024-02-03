import { IUserRequest } from "@/app/interfaces/users-interfaces";
import { UsersRepository } from "@/app/repositories/users-repository";

export const userUpdateService = async (
  userId: string,
  data: Partial<IUserRequest>,
  usersRepository: UsersRepository
) => {
  return await usersRepository.update(userId, data);
};
