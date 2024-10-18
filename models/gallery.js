"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Gallery extends Model {
    static associate({ User, Image }) {
      this.belongsTo(User, { foreignKey: "user_id", as: "user" });
      this.hasMany(Image, {
        foreignKey: "gallery_id",
        as: "image",
        onDelete: "cascade",
        hooks: true,
      });
    }
  }
  Gallery.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      thumbnail_ref: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Gallery",
    }
  );
  return Gallery;
};
