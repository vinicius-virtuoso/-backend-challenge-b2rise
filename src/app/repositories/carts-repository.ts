import { Carts } from "../entities/carts-entity";
import { ICartResponse } from "../interfaces/carts-interfaces";

export abstract class CartsRepository {
  abstract create(data: Carts): Promise<ICartResponse>;

  abstract get(userId: string): Promise<ICartResponse | null>;

  abstract update(
    cartId: string,
    data: { count: number; total: number }
  ): Promise<ICartResponse>;
}
