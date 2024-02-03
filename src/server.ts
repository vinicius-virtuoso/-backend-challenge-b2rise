import "express-async-errors";
import "dotenv/config";

import express, { Express } from "express";
import { errorHandler } from "@/app/error";
import { usersRoutes } from "./infra/http/routes/users-router";
import { adminsRoutes } from "./infra/http/routes/admins-router";
import { authAdminRoutes } from "./infra/http/routes/auth-admin-router";
import { authUserRoutes } from "./infra/http/routes/auth-user-router";
import { productsRoutes } from "./infra/http/routes/products-router";
import { cartsRoutes } from "./infra/http/routes/carts-router";

export class Server {
  private app: Express;

  constructor() {
    this.app = express();
  }

  public middlewares() {
    this.app.use(express.json());
  }

  public erroServer() {
    this.app.use(errorHandler);
  }

  public routes() {
    this.app.use("/admin/auth", authAdminRoutes);
    this.app.use("/user/auth", authUserRoutes);
    this.app.use("/admin", adminsRoutes);
    this.app.use("/users", usersRoutes);
    this.app.use("/products", productsRoutes);
    this.app.use("/cart", cartsRoutes);
  }

  public init(port: number = 3000) {
    this.middlewares();
    this.routes();
    this.erroServer();

    this.app.listen(port, () => {
      console.log("listening on port " + port);
    });
  }
}
