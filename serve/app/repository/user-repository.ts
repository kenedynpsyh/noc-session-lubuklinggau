import {
  user_exclude,
  user_include,
} from "@serve/database/associate/user-associate";
import nocUsers, {
  UserInstance,
} from "@serve/database/models/auth/user-models";
import { Service } from "typedi";

@Service()
export class UserRepository {
  constructor() {}

  /**
   * findoneRepository
   */
  public async findoneRepository(where: {
    [key: string]: any;
  }): Promise<UserInstance> {
    return await nocUsers.findOne({ where: where });
  }

  /**
   * findsOneRepository
   */
  public async findsOneRepository(where: {
    [key: string]: any;
  }): Promise<UserInstance> {
    return await nocUsers.findOne({
      where: where,
      attributes: { exclude: user_exclude },
      include: user_include,
    });
  }

  /**
   * findallRepository
   */
  public async findallRepository(where: {
    [key: string]: any;
  }): Promise<UserInstance[]> {
    return await nocUsers.findAll({
      where: where,
      attributes: { exclude: user_exclude },
      include: user_include,
    });
  }
}
