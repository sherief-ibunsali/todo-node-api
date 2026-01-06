'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TodoTable extends Model {
    static associate(models) {
      // associations here
      // TodoTable.belongsTo(models.Users, { foreignKey: 'user_id' });
      TodoTable.belongsTo(models.Users,{
        foreignKey:'user_id',
        as:'user',
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      })
    }
  }

  TodoTable.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      list: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      images: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'TodoTable',
      tableName: 'TodoTables',
      timestamps: true,
    }
  );

  return TodoTable;
};
