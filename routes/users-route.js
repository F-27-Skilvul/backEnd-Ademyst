const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const { getAllUser, getUserById } = require('../controllers/user-controller');

/* GET users listing. */
router.route('/')
  .get( auth.verifyAdmin, getAllUser)

router.route('/:id')
  .get( auth.verifyToken, getUserById)

module.exports = router;
