const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addCourses, getFollowedCourses, deleteFollowedCourse } = require('../controllers/followCourse-controller');

router.route('/')
  .get(auth.verifyToken, getFollowedCourses)
  .post(auth.verifyToken, addCourses);

router.route('/:id')
  .delete(auth.verifyToken, deleteFollowedCourse);

module.exports = router;
