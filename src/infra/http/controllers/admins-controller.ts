import { AdminsRepository } from "@/app/repositories/admins-repository";
import { adminCreateService } from "@/app/services/admins/admins-create";

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

  // async findOne(req: Request, res: Response) {
  //   const user = await userGetService(req.user.id, this.usersRepository);
  //   return res.status(200).json(user);
  // }

  // async findAll(req: Request, res: Response) {
  //   return res.status(200).json();
  // }

  // async update(req: Request, res: Response) {
  //   const user = await usersUpdateService(
  //     req.user.id,
  //     req.body,
  //     this.usersRepository
  //   );
  //   return res.status(200).json(user);
  // }

  // async delete(req: Request, res: Response) {
  //   await usersDeleteService(req.user.id, this.usersRepository);
  //   return res.status(204).json();
  // }
}
