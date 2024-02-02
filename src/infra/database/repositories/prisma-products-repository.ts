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

  async getAll(): Promise<IProductResponse[]> {
    const products = await prisma.products.findMany();
    return products.map(PrismaProductsMapper.toDomain);
  }
  async update(
    productId: string,
    data: Partial<IProductRequest>
  ): Promise<IProductResponse> {
    const product = await prisma.products.update({
      where: { id: productId },
      data,
    });

    return PrismaProductsMapper.toDomain(product);
  }
  async delete(id: string): Promise<void> {
    await prisma.products.delete({ where: { id } });
  }
}
