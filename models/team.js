"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Teams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Teams.init(
    {
      teamId: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      bossId: {
        required: true,
        type: DataTypes.INTEGER,
      },
      password: {
        required: true,
        type: DataTypes.STRING,
      },
      teamname: {
        required: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Teams",
    }
  );
  Teams.associate = function (models) {
    models.Teams.belongsTo(models.Users, {
      foreignKey: "userId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  };
  Teams.associate = function (models) {
    models.Teams.belongsTo(models.TeamInfos, {
      foreignKey: "id",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  };
  Teams.associate = function (models) {
    models.Teams.hasMany(models.TeamLists, {
      foreignKey: "teamId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  };
  return Teams;
};
