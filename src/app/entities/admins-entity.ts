import { IAdminRequest } from "./../interfaces/admins-interfaces";
import { randomUUID } from "node:crypto";

export class Admins {
  private _id: string;
  private _is_admin: boolean;
  private props: IAdminRequest;

  constructor(props: IAdminRequest, id?: string) {
    this._id = id ?? randomUUID();
    this._is_admin = true;
    this.props = props;
  }

  public get id(): string {
    return this._id;
  }

  public get is_admin(): boolean {
    return this._is_admin;
  }

  public get username(): string {
    return this.props.username;
  }

  public get password(): string {
    return this.props.password;
  }

  public set username(value: string) {
    this.props.username = value;
  }

  public set password(value: string) {
    this.props.password = value;
  }
}
