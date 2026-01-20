const DB = require('../models');
const MultiTodo = DB.MultiTodo;
const fs = require('fs');
const path = require('path');


exports.createMultiTodo = async (req, res) => {
    try {
        const {todo_id} = req.body;
        const images = req.files;
        const user_id = req.user.id;

        if(!todo_id){
            return res.status(400).json({
                status: 'fail',
                message: 'Todo id is required'
            })
        }

        if(!images || images.length === 0){
            return res.status(400).json({
                status: 'fail',
                message: 'At least one image is required'
            })
        }

        const createMultiImages = images.map((img) => {
            return {
                todo_id,
                user_id,
                images: img.filename
            }
        });

        await MultiTodo.bulkCreate(createMultiImages);
        return res.status(201).json({
            status: 'success',
            message: 'Multi images added successfully',
            data: createMultiImages
        })


    }catch(err){
       return res.status(500).json({
          status: 'fail',
          message: err.message
       })
    }
}