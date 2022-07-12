import { DataTypes, Model } from "sequelize";
import { Optional } from "sequelize/types";
import { sequelize } from "..";
import { BaseAtt } from "./user-models";

interface RolesAtt extends BaseAtt {
  avatar: string;
  background: string;
  first_name: string;
  last_name: string;
  gender: string;
  birthday: Date;
  user_id: string;
}

type RolesCreationAtt = Optional<RolesAtt, "id">;
export interface RolesInstance
  extends Model<RolesCreationAtt, RolesAtt>,
    RolesAtt {}
const nocRoles = sequelize.define<RolesInstance>(
  "noc_auth_roles",
  {
    public_id: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    background: {
      type: DataTypes.STRING,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    birthday: {
      type: DataTypes.DATE,
    },
    user_id: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "noc_auth_roles",
    schema: "auth",
    timestamps: false,
  }
);
export default nocRoles;
