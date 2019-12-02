/* eslint-disable no-console */
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const auth = require('./auth');

const createDbConn = (scopeAuth, env) => {
  const {
    user, password, host,
  } = env === 'test' ? scopeAuth.authTest : scopeAuth.authTest;
  const database = env === 'test' ? 'fRiend-test' : 'fRiend';

  return mysql.createConnection({
    host,
    user,
    password,
    database,
    multipleStatements: true,
  });
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

const env = process.env.NODE_ENV;
const dbConn = createDbConn(auth, env);

module.exports = {
  dbConn,
  createDbTables,
  cleanDbTables,
};
