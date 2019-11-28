/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const faker = require('faker/locale/en_US');
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

// TODO - figure out how to programmatically retrieve list of urls
const lenderLogoUrls = [
  'https://hrsf-fec-cho-lenderlogos.s3-us-west-1.amazonaws.com/10271_logo.gif',
  'https://hrsf-fec-cho-lenderlogos.s3-us-west-1.amazonaws.com/10612_logo.gif',
  'https://hrsf-fec-cho-lenderlogos.s3-us-west-1.amazonaws.com/7834_logo.gif',
];
