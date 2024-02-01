import { AdminsRepository } from "@/app/repositories/admins-repository";
import { authenticationAdmin } from "@/app/security/auth/authentication-admins";
import { Request, Response } from "express";

export class AuthAdminController {
  repository: AdminsRepository;

  constructor(repository: AdminsRepository) {
    this.repository = repository;
  }

  async execute(req: Request, res: Response) {
    const token = await authenticationAdmin(
      req.body,
      this.repository as AdminsRepository
    );
    return res.status(201).json(token);
  }
}
