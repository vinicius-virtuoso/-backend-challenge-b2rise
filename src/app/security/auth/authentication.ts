import { AppError } from "@/app/error";
import { IAuthRequest } from "@/app/interfaces/auth-interfaces";
import { AdminsRepository } from "@/app/repositories/admins-repository";
import { UsersRepository } from "@/app/repositories/users-repository";
import { PrismaAdminsRepository } from "@/infra/database/repositories/prisma-admins-repository";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";
import { sign } from "jsonwebtoken";

export const authentication = async (
  credential: IAuthRequest,
  is_admin: boolean = false,
  usersRepository: UsersRepository | AdminsRepository = is_admin
    ? new PrismaAdminsRepository()
    : new PrismaUsersRepository()
) => {
  console.log(usersRepository);
  const findUser = await usersRepository.findByUsername(credential.username);

  if (!findUser) {
    throw new AppError("Credentials invalid.", 401);
  }

  if (findUser.password !== credential.password) {
    throw new AppError("Credentials invalid.", 401);
  }

  const access_token = sign(
    {
      username: findUser.username,
      is_admin: is_admin,
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: findUser.id,
    }
  );

  return { access_token };
};
