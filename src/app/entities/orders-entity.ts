import { ICartItemsResponse } from "./../interfaces/carts-items-interfaces";
import { randomUUID } from "node:crypto";
import { IOrderResponse } from "../interfaces/orders-interfaces";

export class Orders {
  private _id: string;
  private props: Omit<IOrderResponse, "id">;

  constructor(props: Omit<IOrderResponse, "id">, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      products: props.products ?? [],
    };
  }

  public get id(): string {
    return this._id;
  }

  public get userId(): string {
    return this.props.user_id;
  }

  public get products(): Omit<ICartItemsResponse, "id">[] {
    return this.props.products;
  }

  public set userId(value: string) {
    this.props.user_id = value;
  }

  public set products(value: ICartItemsResponse[]) {
    this.products = value;
  }
}
