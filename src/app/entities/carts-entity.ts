import { randomUUID } from "node:crypto";
import { ICartResponse } from "./../interfaces/carts-interfaces";
import {
  ICartItemsRequest,
  ICartItemsResponse,
} from "../interfaces/carts-items-interfaces";
import { Replace } from "@/helpers/Replace";

export class Cart {
  private _id: string;
  private props: ICartResponse;

  constructor(
    props: Replace<
      ICartResponse,
      { products?: ICartItemsRequest[]; count?: number; total?: number }
    >,
    id?: string
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      products: props.products ?? [],
      count: props.count ?? 0,
      total: props.total ?? 0,
    };
  }

  public get id(): string {
    return this._id;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get total(): number {
    return this.props.total;
  }

  public get count(): number {
    return this.props.count;
  }

  public set userId(value: string) {
    this.props.userId = value;
  }

  public set total(value: number) {
    this.props.total = value;
  }

  public set count(value: number) {
    this.props.count = value;
  }

  public get products(): ICartItemsResponse[] {
    return this.props.products;
  }

  public set products(products: ICartItemsRequest[]) {
    this.props.products = products;
  }
}
