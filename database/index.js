/* eslint-disable no-console */
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const auth = require('./auth');

const createDbConn = async (scopeAuth) => {
  const env = process.env.NODE_ENV || 'dev';
  const {
    user, password, host,
  } = scopeAuth[env];

  const conn = await mysql.createPool({
    host,
    user,
    password,
    waitForConnections: true,
    multipleStatements: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  const database = `fRiend_${env}`;
  const query = `
    CREATE DATABASE IF NOT EXISTS ${database};
    USE ${database};
  `;
  await conn.query(query);

  console.log(`MySQL connected for '${env}' env to database '${database}'`);
  return conn;
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

// const env = process.env.NODE_ENV || 'dev';

module.exports = {
  dbConn: createDbConn(auth).catch(console.log),
  createDbTables,
  cleanDbTables,
};
