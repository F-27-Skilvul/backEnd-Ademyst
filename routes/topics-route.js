const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const { getAllTopics, createTopics, getTopicById, getTopicByCourseId, editTopicByid, deleteTopicById } = require('../controllers/topics-controller');

router.route('/')
  .get(auth.verifyToken, getAllTopics)
  .post(auth.verifyAdmin, createTopics)

router.route('/:id')
  .get(auth.verifyToken, getTopicById)
  .put(auth.verifyAdmin, editTopicByid)
  .delete(auth.verifyAdmin, deleteTopicById)
  
router.route('/topics/courses/:id')
  .get(auth.verifyToken, getTopicByCourseId)


  
module.exports = router;
