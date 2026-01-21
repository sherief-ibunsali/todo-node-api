'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Change images column from STRING to JSON
    await queryInterface.changeColumn('MultiTodos', 'images', {
      type: Sequelize.JSON,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert back to STRING if needed
    await queryInterface.changeColumn('MultiTodos', 'images', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
