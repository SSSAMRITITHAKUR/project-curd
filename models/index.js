const sequelize = require('../db');
const User = require('./User');
const Project = require('./Project');


User.belongsToMany(Project, { through: 'UserProjects' });
Project.belongsToMany(User, { through: 'UserProjects' });

module.exports = { sequelize, User, Project };
