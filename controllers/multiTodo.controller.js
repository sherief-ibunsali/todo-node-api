const DB = require('../models');
const MultiTodo = DB.MultiTodo;
const fs = require('fs');
const path = require('path');


exports.createMultiTodo = async (req, res) => {
    try {
      const {todo_id} = req.body;
      const user_id = req.user.id;
      const images = req.files;
      if(!todo_id){
        return res.status(400).json({
            status:'fail',
            message:'Todo ID is required'
        })
      }
      if(!images || images.length === 0){
         return res.status(400).json({
            status: 'fail',
            message: 'At least one image is required'
         })
      }
       const imagesArr = images.map((file) => file.filename);
       const newMultiTodo = await MultiTodo.create({
         user_id,
         todo_id,
         images: imagesArr
       });
       return res.status(201).json({
        status:'success',
        message: 'MultiTodo created successfully',
        data:newMultiTodo
       })
    }catch(err){
       return res.status(500).json({
          status: 'fail',
          message: err.message
       })
    }
}


exports.updateMultiTodo = async (req, res) => {
    try {
        const user_id = req.user.id;
        const {multi_todo_id} = req.params;
        const images = req.files;
        if(images.length === 0 || !images) {
            return res.status(400).json({
                status: 'fail',
                message: 'At least one image is required for update'
            });
        }
        if(!multi_todo_id) {
            return res.status(400).json({
                status: 'fail',
                message: 'MultiTodo ID is required for update'
            });
        } 
        const findMultiTodo = await MultiTodo.findOne({
            where: {
                user_id,
                id: multi_todo_id
            }
        });

        if(!findMultiTodo) {
            return res.status(400).json({
                success: 'fail',
                message: 'MultiTodo not found for the user',
            })
        }
        if(findMultiTodo.images && Array.isArray(findMultiTodo.images)){
           findMultiTodo.images.forEach((file) => {
              const imagePath = path.join(process.cwd(),'uploads/images', file);
           })
        } 
    }catch(err) {
        return res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
}