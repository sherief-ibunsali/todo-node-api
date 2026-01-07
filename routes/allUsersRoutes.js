const express = require("express");
const router = express.Router();
const { getAllUsers } = require('../controllers/getAllUsers.controller');

router.route('/').get(getAllUsers);

module.exports = router;