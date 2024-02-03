import { UsersRepository } from "@/app/repositories/users-repository";
import { authenticationUsers } from "@/app/security/auth/authentication-users";
import { Request, Response } from "express";

export class AuthUserController {
  constructor(private usersRepository: UsersRepository) {}

  async execute(req: Request, res: Response) {
    const token = await authenticationUsers(
      req.body,
      this.usersRepository as UsersRepository
    );
    return res.status(201).json(token);
  }
}
