/* eslint-disable no-console */
const Sequelize = require('sequelize');
const auth = require('./auth');

const {
  database, user, password, host,
} = auth;

const conn = new Sequelize(database, user, password,
  {
    host,
    dialect: 'mysql',
  });

conn
  .authenticate()
  .then(() => {
    console.log(`successfully connected to db '${database}'`);
  })
  .catch((err) => {
    console.log(`unable to connnect to db '${database}'`, err);
  });

module.exports = conn;
