"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("noc_users", {
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
      username: {
        type: Sequelize.DataTypes.STRING(80),
        unique: true,
        allowNull: true,
      },
      email: {
        type: Sequelize.DataTypes.STRING(80),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      token: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      api_token: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        default: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        default: Sequelize.NOW,
        onUpdate: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("noc_users");
  },
};
