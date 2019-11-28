/* eslint-disable no-console */
const Sequelize = require('sequelize');

const auth = {
  database: 'fRiend',
  user: 'test',
  password: 'test',
  host: 'localhost',
};

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
    console.log('successfully connected to db');
  })
  .catch((err) => {
    console.log('unable to connnect to db', err);
  });

module.exports = {
  conn,
  auth,
};
