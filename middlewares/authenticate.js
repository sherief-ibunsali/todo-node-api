const jwt = require('jsonwebtoken');
require('dotenv').config();
const DB = require('../models');
const Token = DB.Token;
const User = DB.Users;

const SECRECT_KEY = process.env.SECRECT_KEY;

authenticate = async (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if(!token){
        return res.status(401).json({
            status: 'fail',
            message:'Access denied. No token provided'
        })
    }
    console.log(token);
    try{
        const decode = jwt.verify(token,SECRECT_KEY);
        const userToken = await Token.findOne({
            where:{
                user_id: decode.id,
                token: token
            }
            
        });
        console.log('userToken',userToken);
        if(!userToken){
            return res.status(401).json({
                status: 'fail',
                message:'Unauthorized user'
            })
        }
        console.log('decode',decode)
        const userTb = await User.findOne({
            where:{
                id: decode.id
            }
        })
        if(!userTb){
           return res.status(401).json({
                status: 'fail',
                message:'User not foune'
           })
        }
        req.user = userTb;
        next();

    }catch(err){
        return res.status(400).json({
            status: 'fail',
            message:err.message || 'Invalid token'
        })
    }
}

module.exports = authenticate;