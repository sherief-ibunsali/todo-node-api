const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const getAllTodoController = require('../controllers/getAllTodo.controller');

router.get('/all', authenticate, getAllTodoController.getAllTodo);

module.exports = router;