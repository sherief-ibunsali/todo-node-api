const DB = require('../models');
const User = DB.Users;
const Token = DB.Token;

exports.registerUser  = async (req, res) => {
    try{
      const {name, frist_name, last_name, email, age, mobile} = req.body;
      if(!name || !frist_name || !last_name || !email || !age || !mobile){
        return res.status(400).json({
          status:'fail',
          message:'Please fill all the requried fields'
        })
      }
      // Check existing User
      const existingUser = await User.findOne({
        where:{
          [Op.or]:[{email, mobile}]
        }
      });
   
      if(existingUser){
        return res.status(409).json({
          status: "fail",
          message: "Email or mobile already exists",
        });
      }
  
      // Creating new users in the DB
      const createUser = await User.create({
        name,
        frist_name,
        last_name,
        email,
        age,
        mobile
      });
        const token = jwt.sign(
          { id: createUser.id, email },
          process.env.SECRECT_KEY,
          { expiresIn: "28d" }
        );
  
      await Token.create({
        user_id: createUser.id,
        token:token
      });
  
      // 📧 SEND WELCOME EMAIL
      // await sendWelcomeEmail(email, name);
  
      return res.status(201).json({
        status:'success',
        message: 'User registered profile successfully',
        data: createUser,
        token
      })
  
    } catch(err) {
      res.status(500).json({
        status: 'fail',
        message: err.message || 'Internal Server Error'
      })
    }
  
  }