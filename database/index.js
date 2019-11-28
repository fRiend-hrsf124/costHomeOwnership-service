/* eslint-disable no-console */
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'test',
  password: 'test',
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) {
    console.log(err.stack);
    return;
  }
  console.log(`connected as ${connection.threadId}`);
});


const schemaFile = path.resolve(__dirname, 'schema.sql');
fs.readFile(schemaFile, (err, fileData) => {
  if (err) {
    console.log(err);
    return;
  }

  const createDBQuery = fileData.toString();
  connection.query(createDBQuery, (error) => {
    if (error) {
      console.log(err);
      return;
    }

    console.log('connected to mysql db');
  });
});


module.exports = connection;
