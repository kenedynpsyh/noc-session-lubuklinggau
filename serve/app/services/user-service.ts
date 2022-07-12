import { Service } from "typedi";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import jsonwebtoken from "jsonwebtoken";
import { pick } from "lodash";
import { UserRepository } from "../repository/user-repository";
import {
  createdfield,
  loginfield,
  passwordfield,
  resetfield,
} from "../fields/user-fields";
import createError from "http-errors";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, CREATED, OK } from "http-status";
import { nocUsers } from "@serve/database/associate/user-associate";
import { createPath, ticket } from "@serve/utils/system";
import { env } from "@serve/utils/env";

@Service()
export class UserService {
  password = (data: string): string => bcrypt.hashSync(data, 10);
  match = (old: string, data: string): boolean => old === data;
  confirmation = (old: string, data: string): boolean =>
    bcrypt.compareSync(old, data);
  constructor(private readonly repository: UserRepository) {}

  /**
   * createdService
   */
  public async createdService(body: createdfield) {
    const find = await this.repository.findoneRepository({ email: body.email });
    if (find) {
      return createError(
        BAD_REQUEST,
        "Email address already exists, please choose another one"
      );
    }
    if (!this.match(body.password, body.confirmation)) {
      return createError(
        BAD_REQUEST,
        "Password don't match, please check again"
      );
    }
    body.password = this.password(body.password);
    const create = await nocUsers.create({
      public_id: nanoid(),
      ...pick(body, ["email", "password"]),
    });
    if (env["test"]) {
      createPath("../../tests/user.txt", JSON.stringify(create));
    }
    return { status: CREATED, message: "Accounts has been created" };
  }

  /**
   * loginService
   */
  public async loginService(body: loginfield) {
    const find = await this.repository.findoneRepository({ email: body.token });
    if (!find) {
      return createError(BAD_REQUEST, "Inccorect username or password");
    }
    if (!this.confirmation(body.password, find.password)) {
      return createError(BAD_REQUEST, "Inccorect username or password");
    }
    const reset = await this.repository.findoneRepository({
      email: body.token,
    });
    reset.api_token = null;
    reset.token = null;
    reset.save();
    find.api_token = jsonwebtoken.sign({ user: reset }, ticket, {
      algorithm: "RS256",
    });
    find.save();
    if(env['test']) {
      createPath('../../tests/token.txt',find.api_token)
    }
    return { status: OK, token: find.api_token };
  }

  /**
   * async resetService
   */
  public async resetService(body: resetfield) {
    const find = await this.repository.findoneRepository(body);
    if (!find) {
      return createError(BAD_REQUEST, "Accounts not found");
    }
    return {
      status: OK,
      message: "Password has been reset, please check your email account.",
    };
  }

  /**
   * passwordService
   */
  public async passwordService(body: passwordfield, public_id: string) {
    const find = await this.repository.findoneRepository({ public_id });
    if (!find) {
      return createError(INTERNAL_SERVER_ERROR, "false");
    }
    if (!this.match(body.password, body.confirmation)) {
      return createError(
        BAD_REQUEST,
        "Password don't match, please check again"
      );
    }
    if (!this.confirmation(body.old, find.password)) {
      return createError(BAD_REQUEST, "Wrong password");
    }
    body.password = this.password(body.password);
    find.update(pick(body, ["password"]));
    return { status: OK, message: "Password has been updated" };
  }
}
