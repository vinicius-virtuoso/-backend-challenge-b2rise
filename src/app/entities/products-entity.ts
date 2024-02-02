import { randomUUID } from "node:crypto";
import { IProductRequest } from "../interfaces/products-interfaces";

export class Products {
  private _id: string;
  private props: IProductRequest;

  constructor(props: IProductRequest, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this.props.title;
  }

  public get description(): string {
    return this.props.description;
  }

  public get price(): number {
    return this.props.price;
  }

  public get category(): string {
    return this.props.category;
  }

  public get image(): string {
    return this.props.image;
  }

  public set title(value: string) {
    this.props.title = value;
  }

  public set description(value: string) {
    this.props.description = value;
  }

  public set price(value: number) {
    this.props.price = value;
  }

  public set category(value: string) {
    this.props.category = value;
  }

  public set image(value: string) {
    this.props.image = value;
  }
}
