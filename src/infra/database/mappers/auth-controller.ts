import { IAuthRequest } from "@/app/interfaces/auth-interfaces";
import { AdminsRepository } from "@/app/repositories/admins-repository";
import { UsersRepository } from "@/app/repositories/users-repository";
import { authentication } from "@/app/security/auth/authentication";
import { Request, Response } from "express";

export class AuthController {
  repository: UsersRepository | AdminsRepository;

  constructor(repository: UsersRepository | AdminsRepository) {
    this.repository = repository;
  }

  async execute(req: Request, res: Response) {
    const token = await authentication(req.body, false, this.repository);
    return res.status(201).json(token);
  }

  async execute_admin(req: Request, res: Response) {
    const token = await authentication(req.body, true, this.repository);
    return res.status(201).json(token);
  }
}
