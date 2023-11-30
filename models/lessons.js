'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lessons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lessons.belongsTo(models.Topics, { foreignKey: 'topic_id' });
    }
  }
  Lessons.init({
    name: DataTypes.STRING,
    time: DataTypes.INTEGER,
    topic_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lessons',
  });
  return Lessons;
};