import "express-async-errors";
import "dotenv/config";
import express, { Express } from "express";
import { errorHandler } from "@/app/error";

export class Server {
  private app: Express;
  private baseUrl: string;

  constructor() {
    this.app = express();
    this.baseUrl = "/api/v1";
  }

  public middlewares() {
    this.app.use(express.json());
  }

  public erroServer() {
    this.app.use(errorHandler);
  }

  public routes() {
    this.app.use(`${this.baseUrl}/users`);
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
