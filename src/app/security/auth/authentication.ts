import { AppError } from "@/app/error";
import {
  IAuthRequest,
  authSchemaResponse,
} from "@/app/interfaces/auth-interfaces";
import { UsersRepository } from "@/app/repositories/users-repository";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";
import { sign } from "jsonwebtoken";

export const authentication = async (
  credential: IAuthRequest,
  usersRepository: UsersRepository = new PrismaUsersRepository()
) => {
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
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: findUser.id,
    }
  );

  return { access_token };
};
