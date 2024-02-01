import { IUserRequest } from "@app/interfaces/users-interfaces";
import { randomUUID } from "node:crypto";

export class Users {
  private _id: string;
  private props: IUserRequest;

  constructor(props: IUserRequest, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  public get id(): string {
    return this._id;
  }

  public get email(): string {
    return this.props.email;
  }

  public get username(): string {
    return this.props.username;
  }

  public get password(): string {
    return this.props.password;
  }

  public get first_name(): string {
    return this.props.first_name;
  }

  public get last_name(): string {
    return this.props.last_name;
  }

  public set username(value: string) {
    this.props.username = value;
  }

  public set email(value: string) {
    this.props.email = value;
  }

  public set password(value: string) {
    this.props.password = value;
  }

  public set first_name(value: string) {
    this.props.first_name = value;
  }

  public set last_name(value: string) {
    this.props.last_name = value;
  }
}
