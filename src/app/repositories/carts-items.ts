import {
  ICartItemsRequest,
  ICartItemsResponse,
} from "../interfaces/carts-items-interfaces";

export abstract class CartsItemsRepository {
  abstract create(data: ICartItemsRequest): Promise<void>;

  abstract get(
    cartId: string,
    productId: string
  ): Promise<ICartItemsResponse | null>;

  abstract update(
    cartItemsId: string,
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<void>;

  abstract remove(
    cartItemsId: string,
    cartId: string,
    productId: string
  ): Promise<void>;

  abstract delete(cartId: string): Promise<void>;
}
