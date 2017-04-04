var Sequelize = require('sequelize');
var sequelize = new Sequelize('facebook_dummy_db', 'postgres', '1234',{
  host:'127.0.0.1',
  dialect:'postgres'
});

module.exports = sequelize;