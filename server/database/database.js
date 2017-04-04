var Sequelize = require('sequelize');
var sequelize = new Sequelize('facebook_dummy_db', 'username', 'password',{
  host:'127.0.0.1',
  dialect:'postgres'
});

module.exports = sequelize;