const express = require("express");
const app = express();
const createTodoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/authRoutes');
const allTokenRoutes = require('./routes/allTokenRoutes');
const allUserRoutes = require('./routes/allUsersRoutes');
const sendWelcomeEmail = require("./email");
const multiTodoRoutes = require('./routes/multiTodoRoutes');
const getAllTodoRoutes = require('./routes/getAllTodoRoutes')

app.use(express.json());

app.use("/v1/api/get-all-tokens",allTokenRoutes);
app.get("/v1/api/all-users", allUserRoutes);

// // User todo list 
app.use('/v1/api/users', userRoutes);
app.use('/v1/api/users/todo', createTodoRoutes);

app.use('/v1/api/multi-todo', multiTodoRoutes);

app.use('/v1/api/get-all-todo', getAllTodoRoutes);


app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
