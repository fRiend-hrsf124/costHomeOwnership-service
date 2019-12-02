/* eslint-disable no-console */
const mysql = require('mysql2');
const auth = require('./auth');

const {
  database, user, password, host,
} = auth;

const conn = mysql.createConnection({
  host,
  user,
  password,
  database,
  multipleStatements: true,
});

// TODO - move table creation here from seed script

module.exports = conn;
