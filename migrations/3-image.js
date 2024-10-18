"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Images", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      image_width: {
        type: Sequelize.INTEGER,
      },
      image_height: {
        type: Sequelize.INTEGER,
      },
      make: {
        type: Sequelize.STRING,
      },
      model: {
        type: Sequelize.STRING,
      },
      iso: {
        type: Sequelize.STRING,
      },
      exposure_time: {
        type: Sequelize.INTEGER,
      },
      ev: {
        type: Sequelize.INTEGER,
      },
      flash: {
        type: Sequelize.BOOLEAN,
      },
      f_number: {
        type: Sequelize.INTEGER,
      },
      date_time: {
        type: Sequelize.DATE,
      },
      date_time_offset: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
        type: Sequelize.DATE,
      },
      gallery_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Galleries",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Images");
  },
};
