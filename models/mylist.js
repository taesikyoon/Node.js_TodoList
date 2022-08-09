'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mylist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mylist.init({
    listId: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    done: DataTypes.BOOLEAN,
    order: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Mylist',
  });

  Mylist.associate = function (models) {
    models.Mylist.belongsTo(models.Users, {
      foreignKey: "userId",
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  };


  return Mylist;
};