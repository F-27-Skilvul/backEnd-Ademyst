const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getAllCourses,
  createCourses,
  getCourseDetail,
  updateCourse,
  deleteCourse } = require('../controllers/courses-controller');

router.route('/')
  .get(auth.verifyToken, getAllCourses)
  .post(auth.verifyAdmin, createCourses)

router.route('/:id')
  .get(auth.verifyToken, getCourseDetail)
  .put(auth.verifyAdmin, updateCourse)
  .delete(auth.verifyAdmin, deleteCourse)

module.exports = router;
