/* eslint-disable no-console */
const mysql = require('mysql2/promise');
const auth = require('./auth');

let connection;

const createDbConn = (scopeAuth) => {
  const {
    database, user, password, host,
  } = scopeAuth;

  return mysql.createConnection({
    host,
    user,
    password,
    database,
    multipleStatements: true,
  });
};

(async (scopeAuth) => {
  connection = await createDbConn(scopeAuth);
  console.log('connected to database');
})(auth).catch(console.log);

module.exports = connection;
