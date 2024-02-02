import { IProductRequest } from "@/app/interfaces/products-interfaces";
import { ProductsRepository } from "@/app/repositories/products-repository";
import { PrismaProductsRepository } from "@/infra/database/repositories/prisma-products-repository";

export const productUpdateService = async (
  productId: string,
  data: Partial<IProductRequest>,
  productsRepository: ProductsRepository = new PrismaProductsRepository()
) => {
  return await productsRepository.update(productId, data);
};
