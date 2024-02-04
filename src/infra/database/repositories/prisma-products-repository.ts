import { Products } from "@/app/entities/products-entity";
import {
  IProductRequest,
  IProductResponse,
} from "@/app/interfaces/products-interfaces";
import { ProductsRepository } from "@/app/repositories/products-repository";
import { prisma } from "../prisma-service";
import { PrismaProductsMapper } from "../mappers/products-mapper";
import { skip } from "node:test";
import { string } from "zod";

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

  async getAll(
    page: number,
    take: number,
    min_price: number,
    max_price: number
  ): Promise<[IProductResponse[], number]> {
    const [products, pages] = await prisma.$transaction([
      prisma.products.findMany({
        where: {
          price: { lte: max_price, gte: min_price },
        },
        skip: page - 1,
        take,
        orderBy: {
          price: "desc",
        },
      }),
      prisma.products.count(),
    ]);

    return [products, pages];
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
