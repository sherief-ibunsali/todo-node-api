const DB = require('../models');
const Token = DB.Token;

exports.getAllTokens = async (req, res) => {
    try{
      const getAllTokens = await Token.findAll();
      return res.status(200).json({
        status:'success',
        data: getAllTokens
      })
  
    }catch(err){
      return res.status(500).json({
        status:'fail',
        message:err.message
      })
    }
  }