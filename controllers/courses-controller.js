const { Courses, Topics, Lessons } = require('../models')

module.exports = {
  getAllCourses: async (req, res) => {
    try {
      const courses = await Courses.findAll({ include: Topics });

      let response = courses.map(async (course) => {
        let topics = course.Topics;
        let countTopics = topics.length;
        let countTopicsTime = 0;

        // Menambahkan total waktu dari masing-masing topik
        for (const topic of topics) {
          const lessons = await Lessons.findAll({ where: { topic_id: topic.id } });
          countTopicsTime += lessons.reduce((sum, lesson) => sum + (lesson.time || 0), 0);
        }

        return {
          id: course.id,
          title: course.title,
          description: course.description,
          totalTime: Math.round(countTopicsTime * 1.5),
          totalTopics: countTopics,
          topics: course.Topics,
        };
      });

      response = await Promise.all(response);
      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createCourses: async (req, res) => {
    try {
      const data = req.body;
      console.log(data);
      const course = await Courses.findAll();

      await Courses.create({
        description: data.description,
        title: data.title,
      })
      
      return res.json({
        message: "berhasil menambahkan course"
      });

    } catch (error) {
      res.status(500).json({
        message: "Anda harus login",
        error: error.message,
      });
    }
  },

  getCourseDetail: async (req, res) => { 
    try {
      const { id } = req.params;
      const course = await Courses.findOne({ where: { id }, include: Topics });
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({
        message: "Anda harus login",
        error: error.message,
      });
    }
  },

  updateCourse: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      // Find the course by ID
      const course = await Courses.findByPk(id);

      // If the course doesn't exist, return an error
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      // Update the course properties
      course.title = title || course.title;
      course.description = description || course.description;

      // Save the changes to the database
      await course.save();

      res.status(200).json({ message: "Course updated successfully", course });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCourse: async (req, res) => {
    try {
      const { id } = req.params;

      // Find the course by ID
      const course = await Courses.findByPk(id);

      // If the course doesn't exist, return an error
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      // Delete the course from the database
      await course.destroy();

      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}