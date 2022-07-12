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
   * findallRepository
   */
  public async findallRepository(where: {
    [key: string]: any;
  }): Promise<UserInstance[]> {
    return await nocUsers.findAll({ where: where });
  }
}
