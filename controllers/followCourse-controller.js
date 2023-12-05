const { followCourse, Courses, Topics } = require('../models');

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

      // Fetch followed courses
      const followedCourses = await followCourse.findAll({
        where: { user_id: userId },
      });

      // Extract course IDs from followedCourses
      const courseIds = followedCourses.map((followedCourse) => followedCourse.course_id);

      // Fetch courses along with their associated Topics
      const coursesWithTopics = await Courses.findAll({
        include: [
          {
            model: Topics,
            attributes: ['title'],
            where: { course_id: courseIds },
            required: false, // Use left join to include courses with no topics
          },
        ],
        where: { id: courseIds },
      });

      // Extract only the titles and calculate totalTopics
      const coursesWithTotalTopics = coursesWithTopics.map((course) => {
        const totalTopics = course.Topics ? course.Topics.length : 0;

        return {
          title: course.title,
          totalTopics: totalTopics,
        };
      });

      res.status(200).json(coursesWithTotalTopics);
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
