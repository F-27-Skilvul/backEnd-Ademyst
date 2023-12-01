const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');
const config = require('./config/config');

const db = new Sequelize(config.development); // Use the 'development' configuration

const { Admins, Courses, followCourse, Lessons, Topics, Users } = require('./models');
const allRoutes = require('./routes');

const PORT = process.env.PORT || 3000;

async function testConnection() {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');

    // await db.sync({ force: true });
    // await User.sync({ force: true });
    // await Admins.sync({ force: true });
    // await followCourse.sync({ force: true });
    // await Lessons.sync({ force: true });
    // await Topics.sync({ force: true });


    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

app.use(express.json());
app.use(allRoutes);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173'); // Update with your actual frontend origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});