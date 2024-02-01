import { UsersRepository } from "@/app/repositories/users-repository";
import { authenticationUsers } from "@/app/security/auth/authentication-users";
import { Request, Response } from "express";

export class AuthUserController {
  repository: UsersRepository;

  constructor(repository: UsersRepository) {
    this.repository = repository;
  }

  async execute(req: Request, res: Response) {
    const token = await authenticationUsers(
      req.body,
      this.repository as UsersRepository
    );
    return res.status(201).json(token);
  }
}
