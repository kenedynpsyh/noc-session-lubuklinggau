import { Express } from "express";
import { Action, useContainer, useExpressServer } from "routing-controllers";
import Container from "typedi";
import jsonwebtoken from "jsonwebtoken";
import { UserController } from "@serve/app/controller/user-controller";

useContainer(Container);

export abstract class BaseRouting {
  constructor() {}

  /**
   * controller
   */
  public controller(app: Express) {
    useExpressServer(app, {
      routePrefix: "/api/v1/",
      controllers: [UserController],
      middlewares: [],
      interceptors: [],
      currentUserChecker: async function (action: Action, roles?: any[]) {
        let token = null;
        token = action.request.headers["authorization"];
        if (token) {
          token = token.split("Bearer ")[1];
        }
        return ((await jsonwebtoken.decode(token)) as any)?.user;
      },
      authorizationChecker: async function (action: Action) {
        let token = null;
        token = action.request.headers["authorization"];

        if (token) {
          token = token.split("Bearer ")[1];
        }
        return Boolean(token);
      },
    });
  }
}
