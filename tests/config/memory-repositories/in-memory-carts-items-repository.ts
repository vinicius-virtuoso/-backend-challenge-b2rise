import {
  ICartItemsRequest,
  ICartItemsResponse,
} from "@/app/interfaces/carts-items-interfaces";
import { CartsItemsRepository } from "@/app/repositories/carts-items";
import { productsMemory } from "./in-memory-products-repository";
import { randomUUID } from "node:crypto";

export interface ICartItemsResponseWithCartId extends ICartItemsResponse {
  cart_id: string;
}

export let cart_itemsMemory: ICartItemsResponseWithCartId[] = [];
export class InMemoryCartsItemsRepository implements CartsItemsRepository {
  async create(data: ICartItemsRequest): Promise<void> {
    const foundProduct = productsMemory.find(
      (product) => product.id === data.product.id
    );
    if (foundProduct) {
      const cartItem = {
        ...data,
        cart_id: data.cartId,
        product: foundProduct,
        id: randomUUID(),
      };
      cart_itemsMemory.push(cartItem);
    }
  }
  async get(
    cartId: string,
    productId: string
  ): Promise<ICartItemsResponse | null> {
    const cartItemFind = cart_itemsMemory.find(
      (item) => item.cart_id === cartId && item.product.id === productId
    );

    if (!cartItemFind) {
      return null;
    }

    return cartItemFind;
  }
  async update(
    cartItemsId: string,
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<void> {
    const cartItemFind = cart_itemsMemory.find(
      (item) =>
        item.cart_id === cartId &&
        item.product.id === productId &&
        item.id === cartItemsId
    );

    if (cartItemFind) {
      cartItemFind.quantity = quantity ?? cartItemFind.quantity;
    }
  }
  async remove(
    cartItemsId: string,
    cartId: string,
    productId: string
  ): Promise<void> {
    cart_itemsMemory = [
      ...cart_itemsMemory.filter(
        (item) =>
          item.id !== cartItemsId &&
          item.cart_id !== cartId &&
          item.product.id !== productId
      ),
    ];
  }
  async delete(cartId: string): Promise<void> {
    cart_itemsMemory = [
      ...cart_itemsMemory.filter((item) => item.cart_id !== cartId),
    ];
  }
}
