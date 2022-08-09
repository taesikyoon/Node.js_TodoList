"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeamInfos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TeamInfos.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        required: true,
        type: DataTypes.INTEGER,
      },
      teamId: {
        required: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "TeamInfos",
    }
  );
  TeamInfos.associate = function (models) {
    models.TeamInfos.belongsTo(models.Users, {
      foreignKey: "userId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  };
  TeamInfos.associate = function (models) {
    models.TeamInfos.belongsTo(models.Teams, {
      foreignKey: "teamId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  };
  return TeamInfos;
};
