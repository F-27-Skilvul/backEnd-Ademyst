const { Lessons, Topics } = require('../models');

module.exports = {
  getAllLessons: async (req, res) => {
    try {
      const lessons = await Lessons.findAll({});
      
      res.status(200).json(lessons);
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  }, 

  createLessons: async (req, res) => {
    try {
      const { name, time, topic_id } = req.body;

      // Check if the specified topic_id exists
      const existingTopic = await Topics.findByPk(topic_id);
      if (!existingTopic) {
        return res.status(404).json({ message: 'Topic not found' });
      }

      // Create the lesson
      const newLesson = await Lessons.create({
        name,
        time,
        topic_id,
      });

      res.status(201).json({ lesson: newLesson });
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  },

  getLessonById: async (req, res) => {
    try {
      const { id } = req.params;
      const lesson = await Lessons.findByPk(id);

      if (!lesson) {
        return res.status(404).json({ message: 'Lesson not found' });
      }

      res.status(200).json({ lesson });
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  },

  editLessonById: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, time, topic_id } = req.body;

      // Check if the specified lesson exists
      const existingLesson = await Lessons.findByPk(id);
      if (!existingLesson) {
        return res.status(404).json({ message: 'Lesson not found' });
      }

      // Update the lesson
      existingLesson.name = name;
      existingLesson.time = time;
      existingLesson.topic_id = topic_id;
      await existingLesson.save();

      res.status(200).json({ lesson: existingLesson });
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  },

  deleteLessonById: async (req, res) => {
    try {
      const { id } = req.params;

      // Check if the specified lesson exists
      const existingLesson = await Lessons.findByPk(id);
      if (!existingLesson) {
        return res.status(404).json({ message: 'Lesson not found' });
      }

      // Delete the lesson
      await existingLesson.destroy();

      res.status(200).json({ message: 'Lesson deleted successfully' });
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  },
}