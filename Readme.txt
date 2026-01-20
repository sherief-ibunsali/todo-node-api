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



5.) Incase if we want to add new foriegn in the existing table need to execute this
 npx sequelize-cli migration:generate --name add-fk-to-multitodos 