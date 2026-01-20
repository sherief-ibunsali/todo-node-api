'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('MultiTodos', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_multitodos_user',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('MultiTodos', {
      fields: ['todo_id'],
      type: 'foreign key',
      name: 'fk_multitodos_todo',
      references: {
        table: 'TodoTables',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint('MultiTodos', 'fk_multitodos_user');
    await queryInterface.removeConstraint('MultiTodos', 'fk_multitodos_todo');
  }
};
