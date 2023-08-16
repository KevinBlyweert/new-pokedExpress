const Sequelize = require('sequelize');
const sequelize = require('../database');

class Users extends Sequelize.Model {};

Users.init({
  login: Sequelize.STRING,
  password: Sequelize.STRING
},{
  sequelize,
  tableName: "users"
});

module.exports = Users;