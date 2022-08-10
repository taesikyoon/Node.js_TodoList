"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeamLists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TeamLists.init(
    {
      listId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      teamId: {
        type: DataTypes.INTEGER,
        require: true,
      },
      content: {
        type: DataTypes.STRING,
        require: true,
      },
      order: {
        type: DataTypes.INTEGER,
        require: true,
      },
      done: {
        require: true,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "TeamLists",
    }
  );
  TeamLists.associate = function (models) {
    models.TeamLists.belongsTo(models.Teams, {
      foreignKey: "teamId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  };
  return TeamLists;
};
