import { Products } from "@/app/entities/products-entity";
import { IProductResponse } from "@/app/interfaces/products-interfaces";

export class TestProductsMapper {
  static toDatabase(data: Products) {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      price: data.price,
      category: data.category,
      image: data.image,
    };
  }

  static toDomain(data: IProductResponse) {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      price: data.price,
      category: data.category,
      image: data.image,
    };
  }
}
