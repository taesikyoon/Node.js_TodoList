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
      type: DataTypes.INTEGER,
    },
    nickname: DataTypes.STRING,
    content: DataTypes.STRING,
    done: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Mylist',
  });
  return Mylist;
};