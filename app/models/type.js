const Sequelize = require('sequelize');
const sequelize = require('../database');

class Type extends Sequelize.Model {};

Type.init({
  name: Sequelize.STRING,
  color: Sequelize.INTEGER
},{
  sequelize,
  tableName: "type"
});

module.exports = Type;