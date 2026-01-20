'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MultiTodo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  MultiTodo.init({
    user_id:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    todo_id: {
     type: DataTypes.INTEGER,
     allowNull:false
    },
    images:{
      type:DataTypes.STRING,
      allowNull:false

    } 
  }, {
    sequelize,
    modelName: 'MultiTodo',
  });
  return MultiTodo;
};