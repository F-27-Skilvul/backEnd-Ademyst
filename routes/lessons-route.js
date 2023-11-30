const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const { getAllLessons, createLessons, getLessonById, editLessonById, deleteLessonById } = require('../controllers/lessons-controller');

router.route('/')
  .get( auth.verifyToken, getAllLessons)
  .post(auth.verifyAdmin, createLessons)

router.route('/:id')
  .get(auth.verifyToken, getLessonById)
  .put(auth.verifyAdmin, editLessonById)
  .delete(auth.verifyAdmin, deleteLessonById)


module.exports = router;
