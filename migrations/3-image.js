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
      image_name: {
        type: Sequelize.STRING,
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
        type: Sequelize.INTEGER,
      },
      exposure_time: {
        type: Sequelize.FLOAT,
      },
      ev: {
        type: Sequelize.FLOAT,
      },
      flash: {
        type: Sequelize.STRING,
      },
      f_number: {
        type: Sequelize.FLOAT,
      },
      date_time: {
        type: Sequelize.STRING,
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
