mysql -u root -p

sequelize - it is ORM, which helps to interact with db by writing javascript instead of raw sql query
https://chatgpt.com/share/69387040-2378-8004-a03b-acdc2620c8b6
In Sequelize, models and migrations are crucial for managing your database.

Models:

- Define the structure and behavior of data in a table
- Represent a table in your database
- Provide a way to interact with the data in that table

Example:

const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db');

class User extends Model {}
User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING
}, {
  sequelize,
  modelName: 'User'
});


Migrations:

- Manage changes to your database schema over time
- Allow you to create, modify, or delete tables, columns, etc.
- Keep track of changes made to the database schema

Example (using Sequelize CLI):

bash
npx sequelize migration:generate --name add-column-to-users

This generates a migration file:

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'phone', {
      type: Sequelize.STRING
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'phone');
  }
};

Run the migration:

bash
npx sequelize db:migrate


Some key benefits of using models and migrations:

- Version control: Migrations allow you to track changes to your database schema over time.
- Collaboration: Migrations make it easy to share changes with team members.
- Reversibility: Migrations provide a way to revert changes if needed.

Do you have any specific questions about models or migrations in Sequelize?

-> Connection password BY 'Sherief@123';

1.) Need to install the sequelize related things and 
    * npm install --save sequelize-cli mysql2
    * npm install express nodemon cors mysql
    * npx sequelize-cli init (it creates the modal and migration folders)

2.) Need to connect with db by configuration
 {
  "development": {
    "username": "root",
    "password": "password",
    "database": "testdb",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
-> configure these things with env and change this into js from json

3.) npx sequelize-cli model:generate --name User --attributes name:string,email:string
   * it creates modal and migration files in the foldrs for the user table

4.) npx sequelize-cli db:migrate
   * it creates the table in the database

To delete the created table in the db and 
   * npx sequelize-cli db:migrate:undo - it undo the previous changes but does not delete any thing from the modal and migration folder

Obj instead of query

1.) To create data in the database 
const newUsers = await Users.create({
    username: username,
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password
 });


2.) If we want to name column type, need to Run
npx sequelize-cli migration:generate --name change-multitodos-images-to-json

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
Need to add the new data type in the Modal
 images: {
        type: DataTypes.JSON,
        allowNull: false
      }   



5.) Incase if we want to add new foriegn in the existing table need to execute this
 npx sequelize-cli migration:generate --name add-fk-to-multitodos 


 6.) Use joins by sequelize
 SELECT
  TodoTables.list,
  TodoTables.images AS todo_image,
  MultiTodos.images AS multi_images
FROM TodoTables
JOIN MultiTodos
  ON MultiTodos.todo_id = TodoTables.id;

///////////////////////////////////
const TodoTable = DB.TodoTable;
const MultiTodo = DB.MultiTodo;

const todos = await TodoTable.findAll({
  attributes: [
    'list',
    ['images', 'todo_image']
  ],
  include: [
    {
      model: MultiTodo,
      as: 'multiTodos',
      attributes: [['images', 'multi_images']]
    }
  ]
});

////
🔍 What Sequelize is matching on (important)

This line:

include: [{
  model: MultiTodo,
  as: 'multiTodos'
}]


👉 Sequelize does NOT guess joins
👉 It uses model associations

🧠 Your Association (THIS is what controls the join)

You (should) have this:

// TodoTable model
TodoTable.hasMany(models.MultiTodo, {
  foreignKey: 'todo_id',
  as: 'multiTodos'
});

// MultiTodo model
MultiTodo.belongsTo(models.TodoTable, {
  foreignKey: 'todo_id',
  as: 'todo'
});
🧩 Sequelize-generated JOIN (Behind the scenes)

Sequelize automatically generates SQL like:

SELECT ...
FROM TodoTables
INNER JOIN MultiTodos
  ON MultiTodos.todo_id = TodoTables.id


⚠️ No user_id is used here

❓ So where does user_id come in?
Answer: Nowhere — unless you explicitly add it

If you want to match by both todo_id AND user_id, you must say so.