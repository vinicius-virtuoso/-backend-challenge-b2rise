import { AdminsRepository } from "@/app/repositories/admins-repository";
import { adminDeleteService } from "@/app/services/admins/admin-delete";
import { adminUpdateService } from "@/app/services/admins/admin-update";
import { adminCreateService } from "@/app/services/admins/admins-create";
import { adminGetService } from "@/app/services/admins/admins-get";

import { Request, Response } from "express";

export class AdminsController {
  adminsRepository: AdminsRepository;

  constructor(adminsRepository: AdminsRepository) {
    this.adminsRepository = adminsRepository;
  }

  async create(req: Request, res: Response) {
    const user = await adminCreateService(req.body, this.adminsRepository);
    return res.status(201).json(user);
  }

  async findOne(req: Request, res: Response) {
    const user = await adminGetService(req.user.id, this.adminsRepository);
    return res.status(200).json(user);
  }

  async update(req: Request, res: Response) {
    const user = await adminUpdateService(
      req.user.id,
      req.body,
      this.adminsRepository
    );
    return res.status(200).json(user);
  }

  async delete(req: Request, res: Response) {
    await adminDeleteService(req.user.id, this.adminsRepository);
    return res.status(204).json();
  }
}
