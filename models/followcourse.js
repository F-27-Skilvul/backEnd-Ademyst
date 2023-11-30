'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class followCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      followCourse.belongsTo(models.Users, { foreignKey: 'user_id' });
      followCourse.belongsTo(models.Courses, { foreignKey: 'course_id' });
    
    }
  }
  followCourse.init({
    user_id: DataTypes.INTEGER,
    course_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'followCourse',
  });
  return followCourse;
};