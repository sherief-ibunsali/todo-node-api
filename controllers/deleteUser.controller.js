const DB = require('../models');
const User = DB.Users;

exports.deleteUser = async (req, res)=> {
    try{
      const {id} = req.params;
      if(!id){
        return res.status(400).json({
          status:'fail',
          message:'Id is requried for deleting the user profile'
        })
      };
  
      const deletUser = await User.findByPk(id);
      if(!deletUser){
        return res.status(404).json({
          status:'fail',
          message:'User not found'
        })
      }
      await deletUser.destroy();
      
      return res.status(200).json({
        status:'success',
        message:'User deleted successfully'
      })
  
    }catch(err){
      return res.status(500).json({
        status:'fail',
        message: err.message || 'Internal Server Error'
      })
    }
  }