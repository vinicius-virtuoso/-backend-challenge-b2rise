import { Products } from "@/app/entities/products-entity";
import { IProductRequest } from "@/app/interfaces/products-interfaces";
import { ProductsRepository } from "@/app/repositories/products-repository";

export const productCreateService = async (
  data: IProductRequest,
  productsRepository: ProductsRepository
) => {
  const product = new Products(data);
  return await productsRepository.create(product);
};
