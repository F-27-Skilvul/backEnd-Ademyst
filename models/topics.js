'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Topics.belongsTo(models.Courses, { foreignKey: 'course_id' });
      Topics.hasMany(models.Lessons, { foreignKey: 'topic_id' });
    }
  }
  Topics.init({
    title: DataTypes.STRING,
    tag: DataTypes.STRING,
    level: DataTypes.STRING,
    course_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Topics',
  });
  return Topics;
};