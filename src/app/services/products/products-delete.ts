import { ProductsRepository } from "@/app/repositories/products-repository";
import { PrismaProductsRepository } from "@/infra/database/repositories/prisma-products-repository";

export const productDeleteService = async (
  productId: string,
  productsRepository: ProductsRepository
) => {
  await productsRepository.delete(productId);
};
