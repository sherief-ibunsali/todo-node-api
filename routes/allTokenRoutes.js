const express = require("express");
const router = express.Router();
const { getAllTokens } = require('../controllers/getAllToken.controller');

router.route('/').get(getAllTokens);

module.exports = router;