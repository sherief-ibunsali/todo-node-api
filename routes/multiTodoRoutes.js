const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const upload = require('../middlewares/multer');
const multiTodoController = require('../controllers/multiTodo.controller');

router.post('/create', authenticate, upload.array('images',5),multiTodoController.createMultiTodo);

router.put('/update/:multi_todo_id', authenticate, upload.array('images',5),multiTodoController.updateMultiTodo);
router.delete('/delete/:multi_todo_id',authenticate,multiTodoController.deleteMultiTodo);

module.exports = router;