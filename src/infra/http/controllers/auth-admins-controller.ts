import { AdminsRepository } from "@/app/repositories/admins-repository";
import { authenticationAdmin } from "@/app/security/auth/authentication-admins";
import { Request, Response } from "express";

export class AuthAdminController {
  constructor(private adminsRepository: AdminsRepository) {}

  async execute(req: Request, res: Response) {
    const token = await authenticationAdmin(
      req.body,
      this.adminsRepository as AdminsRepository
    );
    return res.status(201).json(token);
  }
}
