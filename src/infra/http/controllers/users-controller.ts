import { IUserRequest } from "@/app/interfaces/users-interfaces";
import { UsersRepository } from "@/app/repositories/users-repository";
import { userCreateService } from "@/app/services/users/users-create";
import { PrismaUsersRepository } from "@/infra/database/repositories/prisma-users-repository";

import { Request, Response } from "express";

class UsersController {
  usersRepository: UsersRepository;

  constructor(userRepository: UsersRepository) {
    this.usersRepository = userRepository;
  }

  async create(req: Request, res: Response) {
    const data = req.body as IUserRequest;
    const user = await userCreateService(data, this.usersRepository);
    return res.status(201).json(user);
  }

  async findOne(req: Request, res: Response) {
    return res.status(200).json();
  }

  async findAll(req: Request, res: Response) {
    return res.status(200).json();
  }

  async update(req: Request, res: Response) {
    return res.status(200).json();
  }

  async delete(req: Request, res: Response) {
    return res.status(204).json();
  }
}

export const usersController = new UsersController(new PrismaUsersRepository());
