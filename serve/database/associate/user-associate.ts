import { HasManyOptions, HasOneOptions, Includeable } from "sequelize/types"
import nocUsers from "../models/auth/user-models";

const user_attributes = ['public_id','username','email']
const user_include: Includeable[] = [{

}]

const options: HasOneOptions | HasManyOptions = {
  sourceKey: 'public_id',
  foreignKey: {
    name: 'user_id',
    allowNull: false
  }
}

export {nocUsers,user_include,user_attributes}
