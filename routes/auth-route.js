const express = require('express');
const router = express.Router();
const { login, createUser } = require('../controllers/user-controller');

router.post('/login', login );

router.post('/regis', createUser)


module.exports = router;