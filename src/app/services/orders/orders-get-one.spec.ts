import { describe, test, expect } from "vitest";
import { makeCartItemFactory } from "@test/config/factories/make-cart-items-factory";
import { makeProductFactory } from "@test/config/factories/make-product-factory";
import { makeUserFactory } from "@test/config/factories/make-user-factory";
import {
  InMemoryOrdersRepository,
  ordersMemory,
} from "@test/config/memory-repositories/in-memory-orders-repository";
import { productsMemory } from "@test/config/memory-repositories/in-memory-products-repository";
import { InMemoryUsersRepository } from "@test/config/memory-repositories/in-memory-users-repository";
import { ordersGetOneService } from "./orders-get-one";
import { makeOrderFactory } from "@test/config/factories/make-order-factory";
import { orders_itemsMemory } from "@test/config/memory-repositories/in-memory-orders-items-repository";
import { makeOrderItemFactory } from "@test/config/factories/make-order-item-factory";

describe("Test Get Order purchase", () => {
  test("should be able to read an order by id", async () => {
    const ordersRepo = new InMemoryOrdersRepository();
    const usersRepo = new InMemoryUsersRepository();

    const userFactory = makeUserFactory();
    usersRepo.users.push(userFactory);

    const productFactory = makeProductFactory();
    productsMemory.push(productFactory);

    const orderFactory = makeOrderFactory({ user_id: userFactory.id });
    ordersMemory.push(orderFactory);

    const orderItemFactory = makeOrderItemFactory({
      order_id: orderFactory.id,
    });
    orders_itemsMemory.push(orderItemFactory);

    const order = await ordersGetOneService(
      userFactory.id,
      orderFactory.id,
      ordersRepo
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
