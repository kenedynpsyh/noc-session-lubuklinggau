import { Service } from "typedi";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import jsonwebtoken from "jsonwebtoken";
import { pick } from "lodash";
import { UserRepository } from "../repository/user-repository";
import {
  authorfield,
  createdfield,
  loginfield,
  passwordfield,
  resetfield,
} from "../fields/user-fields";
import createError from "http-errors";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, CREATED, OK } from "http-status";
import {
  nocRoles,
  nocUserLogs,
  nocUsers,
} from "@serve/database/associate/user-associate";
import { createPath, removePath, ticket } from "@serve/utils/system";
import { env } from "@serve/utils/env";
import { Op } from "sequelize";

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
    let first_name: string = "",
      last_name: string = "";
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
    const split = body.fullname.split(" ");
    first_name = split[0];
    if (split.length > 1) {
      for (let i = 0; i < split.length; i++) {
        if (i !== 0) {
          last_name += split[i];
          if (split.length !== i) {
            last_name += " ";
          }
        }
      }
    }
    body.password = this.password(body.password);
    const create = await nocUsers.create({
      public_id: nanoid(),
      ...pick(body, ["email", "password"]),
    });
    await nocRoles.create({
      public_id: nanoid(),
      first_name,
      last_name,
      user_id: create.public_id,
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
    await nocUserLogs.create({ public_id: nanoid(), user_id: find.public_id });
    if (env["test"]) {
      createPath("../../tests/token.txt", find.api_token);
    }
    return { status: OK, token: find.api_token };
  }

  /**
   * logoutService
   */
  public async logoutService(user_id: string) {
    const find = await nocUserLogs.findOne({
      where: { [Op.and]: [{ user_id }, { logoutAt: { [Op.is]: null } }] },
    });
    if (!find) {
      return createError(INTERNAL_SERVER_ERROR, "false");
    }
    find.update({ logoutAt: new Date() });
    return { status: OK };
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

  /**
   * async roleService
   */
  public async roleService(body: authorfield, user_id: string) {
    const result = await nocRoles.findOne({ where: { user_id } });
    if (!result) {
      return createError(INTERNAL_SERVER_ERROR, "false");
    }
    result.update(body);
    return { status: OK, message: "Profile has been updated", result };
  }

  /**
   * async fileService
   */
  public async fileService(
    file: Express.Multer.File,
    path: string,
    user_id: string
  ) {
    const result = await nocRoles.findOne({ where: { user_id } });
    if (!result) {
      return createError(INTERNAL_SERVER_ERROR, "false");
    }
    const files = file.path.split("serve/");
    if (files.length) {
      try {
        removePath(`../upload${result[path]}`);
      } catch (error) {}
      result[path] = files[1];
    }
    result.save();
    return { status: OK, message: "Profile has been updated", result };
  }
}
