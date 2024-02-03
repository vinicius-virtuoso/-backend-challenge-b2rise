import { ProductsRepository } from "@/app/repositories/products-repository";

export const productGetOneService = async (
  productId: string,
  productsRepository: ProductsRepository
) => {
  return await productsRepository.findById(productId);
};
