import { ProductsRepository } from "@/app/repositories/products-repository";
import { PrismaProductsRepository } from "@/infra/database/repositories/prisma-products-repository";

export const productsGetOneService = async (
  product_id: string,
  productsRepository: ProductsRepository = new PrismaProductsRepository()
) => {
  return await productsRepository.findById(product_id);
};
