import "reflect-metadata";
import "tsconfig-paths/register";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import volleyball from "volleyball";
import helmet from "helmet";
import { BaseRouting } from "./base/base-routing";

class App extends BaseRouting {
  app: express.Express = express();
  constructor() {
    this.extensions();
    this.listen();
  }

  private extensions() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ exnteded: false }));
    this.app.use(cors());
    this.app.use(morgan("common"));
    this.app.use(helmet());
    this.app.use(volleyball);
    this.controller(this.app);
  }

  private listen() {}
}

export const app = new App();
