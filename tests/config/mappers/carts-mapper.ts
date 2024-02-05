import { Carts } from "@/app/entities/carts-entity";
import { ICartResponse } from "@/app/interfaces/carts-interfaces";

export class TestCartsMapper {
  static toDatabase(data: Carts) {
    return {
      id: data.id,
      count: data.count,
      user_id: data.user_id,
      total: data.total,
      products: data.products,
    };
  }

  static toDomain(data: ICartResponse) {
    return {
      id: data.id,
      count: data.count,
      user_id: data.user_id,
      total: data.total,
      products: data.products,
    };
  }
}
