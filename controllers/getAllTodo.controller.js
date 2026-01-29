const { where } = require('sequelize');
const DB = require('../models');
const MultiTodo = DB.MultiTodo;
const TodoTable = DB.TodoTable;

exports.getAllTodo = async (req, res) => {
    try{
        const user_id = req.user.id;
        const todo = await TodoTable.findAll({
            // where   : {user_id},
            attributes : ['list',['images','todo_images']],
            include: [
                {
                    model: MultiTodo,
                    as: 'multiTodos',
                    attributes: [['images', 'multi_images']]
                }
            ]
        });
        return res.status(200).json({
            status: 'success',
            data: todo
        });

    }catch(err){
       return res.status(500).json({
            status: 'fail',
            message: err.message || 'Internal Server Error'
       });
    }
}
