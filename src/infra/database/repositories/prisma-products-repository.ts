import { Products } from "@/app/entities/products-entity";
import {
  IProductRequest,
  IProductResponse,
} from "@/app/interfaces/products-interfaces";
import { ProductsRepository } from "@/app/repositories/products-repository";
import { prisma } from "../prisma-service";
import { PrismaProductsMapper } from "../mappers/products-mapper";

export class PrismaProductsRepository implements ProductsRepository {
  async create(data: Products): Promise<IProductResponse> {
    const product = await prisma.products.create({
      data: PrismaProductsMapper.toPrisma(data),
    });
    return PrismaProductsMapper.toDomain(product);
  }
  async findById(id: string): Promise<IProductResponse | null> {
    const product = await prisma.products.findFirst({
      where: { id },
    });
    return product ? PrismaProductsMapper.toDomain(product) : null;
  }

  async findByTitle(title: string): Promise<IProductResponse | null> {
    const product = await prisma.products.findFirst({
      where: { title },
    });
    return product ? PrismaProductsMapper.toDomain(product) : null;
  }

  getAll(): Promise<IProductResponse[]> {
    throw new Error("Method not implemented.");
  }
  update(data: Partial<IProductRequest>): Promise<IProductResponse> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
