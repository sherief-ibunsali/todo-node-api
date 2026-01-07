const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/authenticate');
const upload = require('../middlewares/multer');
const {
  createTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todo.controller');

router.post(
  '/create',
  authenticate,
  upload.single('image'),
  createTodo
);

router.put(
  '/update',
  authenticate,
  upload.single('image'),
  updateTodo
);

router.delete(
  '/delete',
  authenticate,
  deleteTodo
);

module.exports = router;
