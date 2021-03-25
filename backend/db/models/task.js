'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    listId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
    Task.hasMany(models.Comment, {foreignKey: 'taskId'});
    Task.belongsTo(models.List, {foreignKey: 'listId'})
    Task.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Task;
};
