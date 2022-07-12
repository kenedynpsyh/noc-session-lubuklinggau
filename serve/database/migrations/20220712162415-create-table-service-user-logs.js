"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        tableName: "noc_service_user_logs",
        schema: "service",
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
        loginAt: {
          type: Sequelize.DataTypes.DATE,
          default: Sequelize.NOW,
        },
        logoutAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
        },
        user_id: {
          type: Sequelize.DataTypes.STRING(80),
          allowNull: false,
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: "noc_service_user_logs",
      schema: "service",
    });
  },
};
