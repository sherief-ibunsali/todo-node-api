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