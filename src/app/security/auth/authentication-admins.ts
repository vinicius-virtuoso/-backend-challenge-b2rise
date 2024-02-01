import { AppError } from "@/app/error";
import { IAuthRequest } from "@/app/interfaces/auth-interfaces";
import { AdminsRepository } from "@/app/repositories/admins-repository";
import { PrismaAdminsRepository } from "@/infra/database/repositories/prisma-admins-repository";
import { sign } from "jsonwebtoken";

export const authenticationAdmin = async (
  credential: IAuthRequest,
  usersRepository: AdminsRepository = new PrismaAdminsRepository()
) => {
  const findUser = await usersRepository.findByUsername(credential.username);
  console.log(findUser);
  if (!findUser) {
    throw new AppError("Credentials invalid.", 401);
  }

  if (findUser.password !== credential.password) {
    throw new AppError("Credentials invalid.", 401);
  }

  const access_token = sign(
    {
      username: findUser.username,
      is_admin: true,
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: findUser.id,
    }
  );

  return { access_token };
};
