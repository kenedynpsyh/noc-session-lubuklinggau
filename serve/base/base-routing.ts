import { Express } from "express";
import { Action, useContainer, useExpressServer } from "routing-controllers";
import Container from "typedi";
import jsonwebtoken from "jsonwebtoken";

useContainer(Container);

export abstract class BaseRouting {
  constructor() {}

  /**
   * controller
   */
  public controller(app: Express) {
    useExpressServer(app, {
      routePrefix: "/api/v1/",
      controllers: [],
      middlewares: [],
      interceptors: [],
      currentUserChecker: async function (action: Action, roles?: any[]) {
        let token = null;
        token = action.request.headers["authorization"];
        if (token) {
          token = token.split("Bearer ")[1];
        }
        return Boolean(token);
      },
      authorizationChecker: async function (action: Action) {
        let token = null;
        token = action.request.headers["authorization"];

        if (token) {
          token = token.split("Bearer ")[1];
        }
        return ((await jsonwebtoken.decode(token)) as any)?.user;
      },
    });
  }
}
