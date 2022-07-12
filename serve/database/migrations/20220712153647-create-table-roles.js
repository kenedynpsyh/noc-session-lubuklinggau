"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        tableName: "noc_auth_roles",
        schema: "auth",
      },
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          unique: true,
          primaryKey: true,
          autoIncrement: true,
        },
        public_id: {
          type: Sequelize.DataTypes.STRING(80),
          unique: true,
          allowNull: false,
        },
        avatar: {
          type: Sequelize.DataTypes.STRING(120),
          allowNull: true,
        },
        background: {
          type: Sequelize.DataTypes.STRING(120),
          allowNull: true,
        },
        first_name: {
          type: Sequelize.DataTypes.STRING(80),
          allowNull: true,
        },
        last_name: {
          type: Sequelize.DataTypes.STRING(80),
          allowNull: true,
        },
        gender: {
          type: Sequelize.DataTypes.STRING(40),
          allowNull: true,
          default: "Male",
        },
        birthday: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
        },
        user_id: {
          type: Sequelize.DataTypes.STRING(80),
          allowNull: false,
          unique: true,
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: "noc_auth_roles",
      schema: "auth",
    });
  },
};
