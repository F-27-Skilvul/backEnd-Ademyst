const { followCourse, Courses } = require('../models');

module.exports = {
  addCourses: async (req, res) => {
    try {
      console.log('Add Courses Controller Executed');
      console.log(req.body.courssId)
      const { courseId } = req.body;

      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const userId = req.user.id;

      // Check if the user is already following the course
      const existingFollow = await followCourse.findOne({
        where: {
          user_id: userId,
          course_id: courseId,
        },
      });

      if (existingFollow) {
        return res.status(400).json({ message: 'User is already following the course' });
      }

      // Create a new entry in the followCourse table
      await followCourse.create({
        user_id: userId,
        course_id: courseId,
      });

      res.status(201).json({ message: 'Successfully followed the course' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getFollowedCourses: async (req, res) => {
    try {
      console.log('Get Followed Courses Controller Executed');

      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const userId = req.user.id;

      // Fetch followed courses along with titles only
      const followedCourses = await followCourse.findAll({
        include: [{ model: Courses, as: 'course' }],
        where: { user_id: userId },
      });

      // Extract only the titles
      const courseTitles = followedCourses.map((course) => course.course ? course.course.title : null);

      res.status(200).json(courseTitles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteFollowedCourse: async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const userId = req.user.id;
      const courseId = req.params.id;

      // Check if the user is following the course
      const existingFollow = await followCourse.findOne({
        where: {
          user_id: userId,
          course_id: courseId,
        },
      });

      if (!existingFollow) {
        return res.status(404).json({ message: 'User is not following the course' });
      }

      // Delete the entry in the followCourse table
      await existingFollow.destroy();

      res.status(200).json({ message: 'Successfully unfollowed the course' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

};
