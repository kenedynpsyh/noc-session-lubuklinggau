import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "..";

export interface BaseAtt {
  public_id: string;
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserAtt extends BaseAtt {
  username: string;
  email: string;
  password: string;
  api_token: string;
  token: string;
}

type UserCreationAtt = Optional<UserAtt, "id">;
export interface UserInstance
  extends Model<UserCreationAtt, UserAtt>,
    UserAtt {}
const nocUsers = sequelize.define<UserInstance>(
  "noc_users",
  {
    public_id: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    api_token: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "noc_users",
  }
);

export default nocUsers;
