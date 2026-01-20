'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Token,{
        foreignKey:'user_id',
        as:'tokens'
      }),
      User.hasMany(models.TodoTable, {
        foreignKey:'user_id',
        as:'todos'
      }),
      User.hasMany(models.MultiTodo, {
        foreignKey: 'user_id',
        as:'multiTodos'
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    frist_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    email: DataTypes.STRING,
    mobile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return User;
};