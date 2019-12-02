/* eslint-disable no-console */
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
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

const schemaFile = path.resolve(__dirname, 'schema.sql');
const createDBQuery = fs.readFileSync(schemaFile).toString();
conn.promise().query(createDBQuery)
  .then(console.log('db connected'))
  .catch(console.log);

module.exports = conn;
