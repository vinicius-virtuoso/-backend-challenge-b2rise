import {
  IAdminRequest,
  IAdminResponse,
  IAdminWithPasswordResponse,
} from "@/app/interfaces/admins-interfaces";
import { AdminsRepository } from "@/app/repositories/admins-repository";
import { TestAdminsMapper } from "../mappers/admins-mapper";
import { Admins } from "@/app/entities/admins-entity";

export class InMemoryAdminsRepository implements AdminsRepository {
  admins: IAdminWithPasswordResponse[] = [];

  async create(data: Admins): Promise<IAdminResponse> {
    this.admins.push(TestAdminsMapper.toDatabase(data));
    return TestAdminsMapper.toDomain(data);
  }
  async findByUsername(
    username: string
  ): Promise<IAdminWithPasswordResponse | null> {
    const admin = this.admins.find((admin) => admin.username === username);
    if (!admin) {
      return null;
    }
    return TestAdminsMapper.toDomainWithPassword(admin);
  }

  async findById(id: string): Promise<IAdminResponse | null> {
    const admin = this.admins.find((admin) => admin.id === id);
    if (!admin) {
      return null;
    }
    return TestAdminsMapper.toDomain(admin);
  }

  async update(
    adminId: string,
    data: Partial<IAdminRequest>
  ): Promise<IAdminResponse | null> {
    const admin = this.admins.find((admin) => admin.id === adminId);

    if (!admin) {
      return null;
    }

    admin.username = data.username ?? admin.username;
    admin.password = data.password ?? admin.password;

    return TestAdminsMapper.toDomain(admin);
  }
  async delete(adminId: string): Promise<void> {
    this.admins = this.admins.filter((admin) => admin.id !== adminId);
  }
}
