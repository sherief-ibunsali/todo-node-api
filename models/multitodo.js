'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MultiTodo extends Model {
    static associate(models) {
      MultiTodo.belongsTo(models.Users, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }),

      MultiTodo.belongsTo(models.TodoTable, {
        foreignKey: 'todo_id',
        as: 'todo',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }

  MultiTodo.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      todo_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      images: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'MultiTodo',
      tableName: 'MultiTodos',
      timestamps: true
    }
  );

  return MultiTodo;
};
