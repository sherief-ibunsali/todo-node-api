const DB = require('../models');
const User = DB.Users;

exports.updateUser = async (req, res) => {
    try{
      const {id} = req.params;
      const {name, frist_name, last_name, email, age, mobile} = req.body;
  
      if(!id){
        return res.status(400).json({
          status:'fail',
          message:'Id is requried for updating the user profile'
        })
      };
      // Check Aleary existing user
      // const existingUser = await User.findOne({
      //   where:{
      //     [Op.or]:[{email},{mobile}]
      //   }
      // });
      // if(existingUser){
      //   return res.status(409).json({
      //     status:'fail',
      //     message:'Email or Mobile already exit'
      //   })
      // }
  
      //Get that User
      const user = await User.findByPk(id);
      console.log(user);
      if(!user){
        return res.status(404).json({
          status:'fail',
          message:'User not found'
        })
      }
  
      await user.update({
        name, frist_name, last_name, email, age, mobile
      });
  
      return res.status(200).json({
        status: 'success',
        message: 'User updated successfully',
        data: user
      })
  
  
    }catch(err){
      return res.status(500).json({
        status:'fail',
        message:err.message || 'Internal Server Error'
      })
    }
  }