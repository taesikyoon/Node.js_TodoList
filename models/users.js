"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      userId: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      nickname: {
        required: true,
        unique: true,
        type: DataTypes.STRING,
      },
      password: {
        required: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  Users.associate = function (models) {
    models.Users.hasMany(models.Teams, {
      foreignKey: "teamId",
      onDelete: "cascade",
    });
  };
  Users.associate = function (models) {
    models.Users.hasMany(models.TeamInfos, {
      foreignKey: "id",
      onDelete: "cascade",
    });
  };
  Users.associate = function (models) {
    models.Users.hasMany(models.Mylist, {
      foreignKey: "userId",
      onDelete: "cascade",
    });
  };

  return Users;
};
