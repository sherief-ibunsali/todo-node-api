const express = require("express");
const app = express();
const {Op, where} = require('sequelize');
const jwt = require('jsonwebtoken');
const sendWelcomeEmail = require("./email");
const fs = require('fs');
const path = require('path');

const authenticate = require('./middlewares/authenticate');
const upload = require('./middlewares/multer');

app.use(express.json());
const DB = require('./models');
const User = DB.Users;
const Token = DB.Token;
const TodoTable = DB.TodoTable;

app.get("/v1/api/get-all-tokens",);

app.get("/v1/api/all-users", );

app.put('/v1/api/update/:id',)

app.post('/v1/api/register',);


app.delete('/v1/api/delete-user/:id',

);

// User todo list 
app.put('/v1/api/users/update-todo', authenticate,upload.single('image'), );


app.delete('/v1/api/users/delete-todo', authenticate, 

)

app.post(
  '/v1/api/users/create-todo',
  authenticate,
  upload.single('image'), // 👈 multer here
 
);


app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
