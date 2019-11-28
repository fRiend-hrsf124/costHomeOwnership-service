/* eslint-disable no-console */
const Sequelize = require('sequelize');

const db = new Sequelize('fRiend', 'test', 'test',
  {
    host: 'localhost',
    dialect: 'mysql',
    multipleStatements: true,
  });

db
  .authenticate()
  .then(() => {
    console.log('successfully connected to db');
  })
  .catch((err) => {
    console.log('unable to connnect to db', err);
  });

module.exports = db;
