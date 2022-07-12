import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "..";
import { BaseAtt } from "../auth/user-models";

interface UserLogsAtt extends BaseAtt {
  loginAt: Date;
  logoutAt: Date;
  user_id: string;
}

type UserLogCreationAtt = Optional<UserLogsAtt, "id">;
export interface UserLogInstance
  extends Model<UserLogCreationAtt, UserLogsAtt>,
    UserLogsAtt {}
const nocUserLogs = sequelize.define<UserLogInstance>(
  "noc_service_user_logs",
  {
    public_id: {
      type: DataTypes.STRING,
    },
    loginAt: {
      type: DataTypes.DATE,
    },
    logoutAt: {
      type: DataTypes.DATE,
    },
    user_id: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "noc_service_user_logs",
    schema: "service",
    timestamps: false,
  }
);

export default nocUserLogs;
