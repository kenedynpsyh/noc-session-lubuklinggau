require("dotenv").config();

const env = process.env;

module.exports = {
  development: {
    username: env["db_user"],
    password: env["db_pass"],
    database: env["db_name"],
    host: env["db_host"],
    port: parseInt(env["db_port"]),
    dialect: env["db_dialect"],
  },
};
