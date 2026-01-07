const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const {
  registerUser,
  updateUser,
  deleteUser
} = require('../controllers/auth.controller');

// REGISTER USER
router.post('/register', registerUser);

// UPDATE USER (id from params)
router.put('/update/:id',authenticate, updateUser);

// DELETE USER (id from params)
router.delete('/delete/:id',authenticate, deleteUser);

module.exports = router;
