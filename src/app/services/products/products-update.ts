import { IProductRequest } from "@/app/interfaces/products-interfaces";
import { ProductsRepository } from "@/app/repositories/products-repository";

export const productUpdateService = async (
  productId: string,
  data: Partial<IProductRequest>,
  productsRepository: ProductsRepository
) => {
  return await productsRepository.update(productId, data);
};
