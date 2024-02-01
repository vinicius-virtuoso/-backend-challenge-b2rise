import "express-async-errors";
import "dotenv/config";
import express, { Express } from "express";
import { errorHandler } from "@/app/error";
import { usersRoutes } from "./infra/http/routes/users-router";

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
    this.app.use("/users", usersRoutes);
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
