import { HasManyOptions, HasOneOptions, Includeable } from "sequelize/types";
import nocRoles from "../models/auth/roles-models";
import nocUsers from "../models/auth/user-models";
import nocUserLogs from "../models/service/user-logs-models";

const user_exclude = [
  "id",
  "password",
  "token",
  "api_token",
  "createdAt",
  "updatedAt",
];
const user_include: Includeable[] = [
  {
    model: nocRoles,
    as: "author",
  },
  {
    model: nocUserLogs,
    as: "logs",
  },
];

const options: HasOneOptions | HasManyOptions = {
  sourceKey: "public_id",
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
};

nocUsers.hasOne(nocRoles, {
  ...options,
  as: "author",
});

nocUsers.hasMany(nocUserLogs, {
  ...options,
  as: "logs",
});

export { nocUsers, nocRoles, nocUserLogs, user_include, user_exclude };
