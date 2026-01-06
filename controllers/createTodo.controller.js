const DB = require('../models');
const TodoTable = DB.TodoTable;


exports.createTodo = async (req, res) => {
    try {
      const { list } = req.body;
      const user_id = req.user.id; // 👈 from token
      console.log('User details',req.user)
      if (!list) {
        return res.status(400).json({
          status: 'fail',
          message: 'Todo list is required',
        });
      }

      if (!req.file) {
        return res.status(400).json({
          status: 'fail',
          message: 'Image is required',
        });
      }

      const createTodo = await TodoTable.create({
        user_id,
        list,
        images: req.file.filename,
      });

      return res.status(201).json({
        status: 'success',
        message: 'Todo has been created successfully',
        data: createTodo,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'fail',
        message: err.message || 'Internal Server Error',
      });
    }
  }