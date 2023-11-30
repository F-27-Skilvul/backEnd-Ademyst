const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addCourses, getFollowedCourses } = require('../controllers/followCourse-controller');

router.route('/')
  .get(auth.verifyToken, getFollowedCourses)
  .post(auth.verifyToken, addCourses);

module.exports = router;
