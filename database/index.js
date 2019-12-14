/* eslint-disable no-console */
const mysql = require('mysql2/promise');
// const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const auth = require('./auth');

const createDbConn = async (scopeAuth) => {
  const env = process.env.NODE_ENV || 'dev';
  const {
    user, password, host,
  } = scopeAuth[env];

  const conn = await mysql.createConnection({
    host,
    user,
    password,
    multipleStatements: true,
  });

  const database = `fRiend_${env}`;
  const query = `
    CREATE DATABASE IF NOT EXISTS ${database};
    USE ${database};
  `;
  await conn.query(query);
  await conn.end();

  let pool;
  try {
    pool = mysql.createPool({
      host,
      user,
      database,
      password,
      multipleStatements: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  } catch (error) {
    console.log(`error creating pool for mysql database '${database}'`);
    console.log(error);
  }

  console.log(`MySQL connected for '${env}' env to database '${database}'`);
  return pool;
};

const createDbTables = (conn) => {
  const schemaFile = path.resolve(__dirname, 'schema.sql');
  const createDBQuery = fs.readFileSync(schemaFile).toString();

  return conn.query(createDBQuery);
};

const cleanDbTables = (conn) => {
  const query = `
    SET FOREIGN_KEY_CHECKS = 0;

    TRUNCATE TABLE rates;
    TRUNCATE TABLE lenders;
    TRUNCATE TABLE properties;
    TRUNCATE TABLE zips;

    SET FOREIGN_KEY_CHECKS = 1;
  `;
  return conn.query(query);
};

module.exports = {
  dbConn: createDbConn(auth).catch(console.log),
  createDbTables,
  cleanDbTables,
};
