/* eslint-disable no-console */
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'test',
  password: 'test',
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) console.log(err.stack);
  console.log(`connected as ${connection.threadId}`);
});

const DB = 'fRiend';
const createDBQuery = `
  CREATE DATABASE IF NOT EXISTS ${DB};
  USE ${DB};
  CREATE TABLE IF NOT EXISTS properties(

  );
  CREATE TABLE IF NOT EXISTS properties(

  );
`;

connection.query(createDBQuery, (err) => {
  if (err) console.log(err);
  console.log(`connected to mysql db '${DB}'`);
});

module.exports = connection;
