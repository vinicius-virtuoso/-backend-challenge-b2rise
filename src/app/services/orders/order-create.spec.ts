import { describe, test, expect } from "vitest";
import { makeCartFactory } from "@test/config/factories/make-cart-factory";
import { makeCartItemFactory } from "@test/config/factories/make-cart-items-factory";
import { makeProductFactory } from "@test/config/factories/make-product-factory";
import { makeUserFactory } from "@test/config/factories/make-user-factory";
import { cart_itemsMemory } from "@test/config/memory-repositories/in-memory-carts-items-repository";
import {
  InMemoryCartsRepository,
  cartsMemory,
} from "@test/config/memory-repositories/in-memory-carts-repository";
import { InMemoryOrdersItemsRepository } from "@test/config/memory-repositories/in-memory-orders-items-repository";
import { InMemoryOrdersRepository } from "@test/config/memory-repositories/in-memory-orders-repository";
import { productsMemory } from "@test/config/memory-repositories/in-memory-products-repository";
import { InMemoryUsersRepository } from "@test/config/memory-repositories/in-memory-users-repository";
import { orderCreateService } from "./order-create";

describe("Test create Order purchase", () => {
  test("should be able to create an order", async () => {
    const usersRepo = new InMemoryUsersRepository();

    const userFactory = makeUserFactory();
    usersRepo.users.push(userFactory);

    const productFactory = makeProductFactory();
    productsMemory.push(productFactory);

    const cartItemFactory = makeCartItemFactory({
      product: productFactory,
      quantity: 1,
    });

    const cartFactory = makeCartFactory({
      user_id: userFactory.id,
      products: [
        {
          id: cartItemFactory.id,
          quantity: cartItemFactory.quantity,
          product: cartItemFactory.product,
        },
      ],
    });

    cart_itemsMemory.push({
      ...cartItemFactory,
      cart_id: cartFactory.id,
    });

    const cartsRepo = new InMemoryCartsRepository();
    cartsMemory.push(cartFactory);

    const ordersRepo = new InMemoryOrdersRepository();
    const ordersItemsRepo = new InMemoryOrdersItemsRepository();

    const order = await orderCreateService(
      userFactory.id,
      cartsRepo,
      ordersRepo,
      ordersItemsRepo
    );

    expect(order).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        user_id: expect.any(String),
        date: expect.any(Date),
        products: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            order_id: expect.any(String),
            quantity: expect.any(Number),
            price: expect.any(Number),
            product: expect.objectContaining({
              id: expect.any(String),
              title: expect.any(String),
              description: expect.any(String),
              category: expect.any(String),
              image: expect.any(String),
              price: expect.any(Number),
            }),
          }),
        ]),
      })
    );
  });
});
