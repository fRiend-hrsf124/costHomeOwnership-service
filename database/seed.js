/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const auth = require('./auth');

async function addTables(credentials) {
  const {
    database, user, password, host,
  } = credentials;

  const conn = await mysql.createConnection({
    host,
    user,
    password,
    database,
    multipleStatements: true,
  });

  const schemaFile = path.resolve(__dirname, 'schema.sql');
  const createDBQuery = fs.readFileSync(schemaFile).toString();

  await conn.query(createDBQuery);

  console.log('successfully created tables');
  conn.close();
}

addTables(auth)
  .catch((err) => {
    console.log(err);
  });
