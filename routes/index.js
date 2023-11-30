const express = require('express');
const route = express.Router();

const usersRouter = require('./users-route');
const authRouter = require('./auth-route');
const coursesRouter = require('./courses-route');
const topicsRouter = require('./topics-route');
const followCourseRouter = require('./followCourse-route');
const lessonsRouter = require('./lessons-route');

route.get("/", (req, res) => {
  res.json({
    message: "Halo express"
  })
})

route.use('/users', usersRouter);
route.use('/auth', authRouter);
route.use('/courses', coursesRouter);
route.use('/topics', topicsRouter);
route.use('/followCourse', followCourseRouter);
route.use('/lessons', lessonsRouter);

module.exports = route;