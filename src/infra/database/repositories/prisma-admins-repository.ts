import { prisma } from "../prisma-service";
import { AdminsRepository } from "@/app/repositories/admins-repository";
import { Admins } from "@/app/entities/admins-entity";
import { PrismaAdminsMapper } from "../mappers/admins-mapper";
import {
  IAdminRequest,
  IAdminResponse,
  IAdminWithPasswordResponse,
} from "@/app/interfaces/admins-interfaces";

export class PrismaAdminsRepository implements AdminsRepository {
  async create(data: Admins): Promise<IAdminResponse> {
    const user = await prisma.admins.create({
      data: PrismaAdminsMapper.toPrisma(data),
    });
    return PrismaAdminsMapper.toDomain(user);
  }
  async findByUsername(
    username: string
  ): Promise<IAdminWithPasswordResponse | null> {
    const user = await prisma.admins.findFirst({
      where: { username },
    });
    return user ? PrismaAdminsMapper.toDomainWithPassword(user) : null;
  }

  async findById(userId: string): Promise<IAdminResponse | null> {
    const user = await prisma.admins.findUnique({
      where: { id: userId },
    });
    return user ? PrismaAdminsMapper.toDomain(user) : null;
  }

  async update(
    userId: string,
    data: Partial<IAdminRequest>
  ): Promise<IAdminResponse> {
    const user = await prisma.admins.update({
      where: { id: userId },
      data,
    });

    return PrismaAdminsMapper.toDomain(user);
  }

  async delete(userId: string): Promise<void> {
    await prisma.admins.delete({ where: { id: userId } });
  }
}
