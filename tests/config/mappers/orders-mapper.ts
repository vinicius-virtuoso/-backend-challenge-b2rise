import { Orders } from "@/app/entities/orders-entity";
import { IOrderResponse } from "@/app/interfaces/orders-interfaces";

export class TestOrdersMapper {
  static toDatabase(data: Orders) {
    return {
      id: data.id,
      user_id: data.user_id,
      date: data.date,
      products: data.products || [],
    };
  }

  static toDomain(data: IOrderResponse) {
    return {
      id: data.id,
      user_id: data.user_id,
      products: data.products,
      date: data.date,
    };
  }
}
