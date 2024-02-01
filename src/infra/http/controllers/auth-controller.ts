import { IAuthRequest } from "@/app/interfaces/auth-interfaces";
import { UsersRepository } from "@/app/repositories/users-repository";
import { authentication } from "@/app/security/auth/authentication";
import { Request, Response } from "express";

export class AuthController {
  usersRepository: UsersRepository;

  constructor(userRepository: UsersRepository) {
    this.usersRepository = userRepository;
  }

  async execute(req: Request, res: Response) {
    const data = req.body as IAuthRequest;

    const token = await authentication(data, this.usersRepository);
    console.log(token);
    return res.status(201).json(token);
  }
}
