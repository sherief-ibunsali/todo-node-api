const DB = require('../models');
const TodoTable = DB.TodoTable;
const fs = require('fs');
const path = require('path');

exports.deleteTodo =  async (req, res)=> {
    try{
    const {todo_id} = req.body;
    const user_id = req.user.id;
    if(!todo_id){
      return res.status(400).json({
        status:'fail',
        message:'Todo id is required for deleting the todo'
      })
    }
    const findTodo = await TodoTable.findOne({
      where:{
        id: todo_id,
        user_id
      }
    });
      if(!findTodo){
        return res.status(404).json({
          status:'fail',
          message:'Todo not found'
        })
      };
      if(findTodo.images){
        const existingImage = path.join(process.cwd(),'uploads/images',findTodo.images);
        if(fs.existsSync(existingImage)){
              fs.unlinkSync(existingImage);
            }
      };
    await findTodo.destroy();
    return res.status(200).json({
      status:'success',
      message:'Todo deleted successfully'
    })
      
    }catch(err){
      return res.status(500).json({
        status:'fail',
        message:err.message || 'Internal Server Error'
      })
    }
  }

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


  exports.updateTodo =  async (req, res) => {
    try {
      const {todo_id, list} = req.body;
      const user_id = req.user.id;
      const images = req.file;
      if(!todo_id){
        return res.status(400).json({
          status:'fail',
          message:'Todo id is required for updating the todo'
        })
      };
      
      const findTodo = await TodoTable.findOne({
        where: {
          user_id,
          id: todo_id
        }
      });
      if(!findTodo){
        return res.status(404).json({
          status: 'fail',
          message: 'Todo not found'
        })
      }
      const updateTodo = {};
      if(list){
        updateTodo.list = list;
      }
      if(images) {
          if(findTodo.images) {
            const existingImagePath = path.join(process.cwd(), 'uploads/images',findTodo.images);
            if(fs.existsSync(existingImagePath)){
              fs.unlinkSync(existingImagePath);
            }
  
          }
          updateTodo.images = images.filename;
        }
        const updateTodoData = await TodoTable.update(updateTodo, {
          where : {
            user_id: user_id,
            id: todo_id
          }
        });
        return res.status(200).json({
          status: 'success',
          message: 'Todo updated successfully',
          data: updateTodoData
        })
  
    } catch(err) {
      return res.status(500).json({
        status:'fail',
        message:err.message || 'Internal Server Error'
      })
    }
  }