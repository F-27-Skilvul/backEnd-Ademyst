const { Topics, Lessons } = require('../models');

module.exports = {
  getAllTopics: async (req, res) => {
    try {
      const topics = await Topics.findAll({ include: Lessons });

      let response = topics.map((topic) => {
        let lessons = topic.Lessons
        let countLessons = lessons.length;
        let countLessonsTime = lessons.reduce((sum, lesson) => sum + lesson.time, 0);
        countLessonsTime = countLessonsTime * 1.5;
        return {
          id: topic.id,
          title: topic.title,
          tag: topic.tag,
          level: topic.level,
          totalTime: Math.round(countLessonsTime),
          totalLessons: countLessons,
          course_id: topic.course_id,
          lessons: topic.Lessons,
        };
      });
      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching topics:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createTopics: async (req, res) => {
    const { title, tag, level, course_id } = req.body;

    try {
      const newTopic = await Topics.create({
        title,
        tag,
        level,
        course_id,
      });

      res.status(201).json({ topic: newTopic });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getTopicById: async (req, res) => {
    try {
      const { id } = req.params;
      const topic = await Topics.findOne({ where: { id }, include: Lessons });
      
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }

      let lessons = topic.Lessons;
      let countLessonsTime = lessons.reduce((sum, lesson) => sum + lesson.time, 0);
      countLessonsTime = countLessonsTime * 1.5;

      let response = {
        id: topic.id,
        title: topic.title,
        level: topic.level,
        time: topic.time,
        course_id: topic.course_id,
        lessons: topic.Lessons,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getTopicByCourseId: async (req, res) => { 
    try {
      const { course_id } = req.params;
      const topics = await Topics.findAll({
        where: { course_id },
        include: Lessons,
      });

      let response = topics.map((topic) => {
        let lessons = topic.Lessons;
        let countLessons = lessons.length;
        let countLessonsTime = lessons.reduce((sum, lesson) => sum + lesson.time, 0);
        countLessonsTime = countLessonsTime * 1.5;
        return {
          id: topic.id,
          title: topic.title,
          tag: topic.tag,
          level: topic.level,
          totalTime: Math.round(countLessonsTime),
          totalLessons: countLessons,
          course_id: topic.course_id,
          lessons: topic.Lessons,
        };
      });

      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching topics by course_id:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  editTopicByid: async (req, res) => { 
    try {
      const { id } = req.params;
      const { title, tag, level, course_id } = req.body;
      const topic = await Topics.findOne({ where: { id } });
      
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }

      await Topics.update(
        { title, tag, level, course_id },
        { where: { id } }
      );

      res.status(200).json({ message: "Topic updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteTopicById: async (req, res) => {
    try {
      const { id } = req.params;
      const topic = await Topics.findOne({ where: { id } });
      
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }

      await Topics.destroy({ where: { id } });

      res.status(200).json({ message: "Topic deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};
