import { ProductsRepository } from "@/app/repositories/products-repository";
import { PrismaProductsRepository } from "@/infra/database/repositories/prisma-products-repository";

export const productGetOneService = async (
  productId: string,
  productsRepository: ProductsRepository = new PrismaProductsRepository()
) => {
  return await productsRepository.findById(productId);
};
