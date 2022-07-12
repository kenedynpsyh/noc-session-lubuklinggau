import { HasManyOptions, HasOneOptions, Includeable } from "sequelize/types";
import nocRoles from "../models/auth/roles-models";
import nocUsers from "../models/auth/user-models";

const user_attributes = ["public_id", "username", "email"];
const user_include: Includeable[] = [
  {
    model: nocRoles,
    as: "author",
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

export { nocUsers,nocRoles, user_include, user_attributes };
