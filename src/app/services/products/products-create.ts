import { Products } from "@/app/entities/products-entity";
import { IProductRequest } from "@/app/interfaces/products-interfaces";
import { ProductsRepository } from "@/app/repositories/products-repository";
import { PrismaProductsRepository } from "@/infra/database/repositories/prisma-products-repository";

export const productCreateService = async (
  data: IProductRequest,
  productsRepository: ProductsRepository = new PrismaProductsRepository()
) => {
  const product = new Products(data);
  return await productsRepository.create(product);
};
