"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Gallery }) {
      this.hasMany(Gallery, {
        foreignKey: "user_id",
        as: "to_galleries",
        onDelete: "cascade",
        hooks: true,
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
