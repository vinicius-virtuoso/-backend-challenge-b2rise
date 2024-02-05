import { Carts } from "@/app/entities/carts-entity";
import { ICartResponse } from "@/app/interfaces/carts-interfaces";
import { CartsRepository } from "@/app/repositories/carts-repository";
import { TestCartsMapper } from "../mappers/carts-mapper";
import { cart_itemsMemory } from "./in-memory-carts-items-repository";

export let cartsMemory: ICartResponse[] = [];

export class InMemoryCartsRepository implements CartsRepository {
  public carts: ICartResponse[] = [];

  constructor() {
    this.carts = cartsMemory;
  }

  async create(data: Carts): Promise<ICartResponse> {
    const cart = TestCartsMapper.toDatabase(data);
    this.carts.push(cart);
    return TestCartsMapper.toDomain(cart);
  }
  async get(userId: string): Promise<ICartResponse | null> {
    const cart = this.carts.find((cart) => cart.user_id === userId);

    if (!cart) {
      return null;
    }

    return TestCartsMapper.toDomain({
      ...cart,
      products: cart_itemsMemory.filter((item) => item.cart_id === cart.id),
    });
  }
  async update(
    cartId: string,
    data: { count: number; total: number }
  ): Promise<ICartResponse | null> {
    const cart = this.carts.find((cart) => cart.id === cartId);

    if (!cart) {
      return null;
    }

    cart.count = data.count ?? cart.count;
    cart.total = data.total ?? cart.total;

    return TestCartsMapper.toDomain({
      ...cart,
      products: cart_itemsMemory.filter((item) => item.cart_id === cart.id),
    });
  }
}
