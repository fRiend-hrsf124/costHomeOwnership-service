/* eslint-disable no-console */
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const auth = require('./auth');

const createDbConn = (scopeAuth, env) => {
  const authEnv = `auth${env}`;
  const {
    user, password, host,
  } = scopeAuth[authEnv];

  return mysql.createConnection({
    host,
    user,
    password,
    multipleStatements: true,
  });
};

const selectDbInstance = (conn, env) => {
  const database = env === 'test' ? 'fRiend_test' : 'fRiend';
  const query = `
    CREATE DATABASE IF NOT EXISTS ${database};
    USE ${database};
  `;

  return conn.query(query);
};

const testDbConn = (conn, env) => {
  conn.connect();
  selectDbInstance(conn, env);
  console.log(`MySQL connected for '${env}' env`);
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

const env = process.env.NODE_ENV || 'Dev';
const untestedConn = createDbConn(auth, env);
const dbConn = testDbConn(untestedConn, env).promise();

module.exports = {
  dbConn,
  createDbTables,
  cleanDbTables,
};
