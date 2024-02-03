import { ProductsRepository } from "@/app/repositories/products-repository";

export const productsGetAllService = async (
  productsRepository: ProductsRepository
) => {
  return await productsRepository.getAll();
};
