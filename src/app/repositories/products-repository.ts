import { Products } from "@app/entities/products-entity";
import { IProductResponse } from "../interfaces/products-interfaces";

export abstract class ProductsRepository {
  abstract create(data: Products): Promise<IProductResponse>;

  abstract findById(id: string): Promise<IProductResponse | null>;

  abstract findByTitle(title: string): Promise<IProductResponse | null>;

  abstract getAll(
    page: number,
    take: number,
    category: string,
    title: string,
    min_price: number,
    max_price: number
  ): Promise<[IProductResponse[], number]>;

  abstract update(
    productId: string,
    data: Partial<IProductResponse>
  ): Promise<IProductResponse>;

  abstract delete(id: string): Promise<void>;
}
