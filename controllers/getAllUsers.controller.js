const DB = require('../models');
const User = DB.Users;

exports.getAllUsers = async (req, res) => {
    try{
      const getAllUsers = await User.findAll();
      return res.status(200).json({
        status:'success',
        count:getAllUsers.length,
        data:getAllUsers,
      })
    }catch(err){
      return res.status(500).json({
        status:'fail',
        message:err.message || 'Internal Server Error'
      })
    }
  }